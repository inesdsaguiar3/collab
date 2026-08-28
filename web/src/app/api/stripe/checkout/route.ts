import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRetreatBySlug } from "@/lib/mdx";
import { getStripe, getStripeSecretKey } from "@/lib/stripe";

/** Read `STRIPE_SECRET_KEY` at request time (Vercel injects it at runtime). */
export const dynamic = "force-dynamic";

type Body = {
  slug: string;
  offerName: string;
};

function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (raw) return raw;
  const vercel = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  throw new Error("Set NEXT_PUBLIC_SITE_URL for Stripe return URLs (e.g. https://yoursite.com)");
}

/**
 * Retreat checkout — same flow as `casadosol` `create-retreat-payment-link`:
 * server reads product/price from MDX (source of truth), creates Product + Price + Payment Link.
 */
export async function POST(req: Request) {
  try {
    const { slug, offerName } = (await req.json()) as Body;
    if (!slug || !offerName) {
      return NextResponse.json({ error: "Missing slug or offerName" }, { status: 400 });
    }

    const retreat = getRetreatBySlug(slug);
    if (!retreat?.frontmatter?.offers?.length) {
      return NextResponse.json({ error: "Retreat offers not found" }, { status: 404 });
    }

    const offer = retreat.frontmatter.offers.find(
      (o) => (o.name || "").trim().toLowerCase() === offerName.trim().toLowerCase(),
    );
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    const base = Number(offer.price);
    const discount = Number(offer.earlyBirdDiscount ?? 0);
    let finalPrice = base;
    let priceDescription = `Booking: ${offer.name ?? offerName} — ${retreat.frontmatter.title}.`;

    if (discount > 0 && discount < base) {
      finalPrice = base - discount;
      priceDescription += " (Early bird discount applied.)";
    }

    const amountInCents = Math.round(finalPrice * 100);
    if (!Number.isFinite(amountInCents) || amountInCents <= 0) {
      return NextResponse.json({ error: "Invalid offer price" }, { status: 400 });
    }

    const currency = (offer.priceCurrency || "EUR").toLowerCase();
    const baseUrl = siteUrl();

    if (!getStripeSecretKey()) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Locally: add STRIPE_SECRET_KEY to web/.env.local (Secret key sk_test_ or sk_live_), then restart the dev server. On Vercel: set STRIPE_SECRET_KEY in Project → Settings → Environment Variables for Production, then redeploy.",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();

    const product = await stripe.products.create({
      name: `${retreat.frontmatter.title} — ${offer.name ?? offerName}`,
      description: priceDescription,
      images: retreat.frontmatter.mainImageUrl
        ? [`${baseUrl}${retreat.frontmatter.mainImageUrl}`]
        : undefined,
    });

    const price = await stripe.prices.create({
      currency,
      unit_amount: amountInCents,
      product: product.id,
    });

    const successUrl = `${baseUrl}/retreats/${encodeURIComponent(slug)}?source=payment_link&success=1&offer=${encodeURIComponent(offerName)}`;

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      after_completion: {
        type: "redirect",
        redirect: { url: successUrl },
      },
      metadata: {
        retreatSlug: slug,
        retreatId: retreat.frontmatter.id,
        offerName: offer.name ?? offerName,
        totalAmount: finalPrice.toString(),
        basePrice: base.toString(),
        ...(discount > 0 ? { earlyBirdDiscount: discount.toString() } : {}),
      },
    });

    return NextResponse.json({ paymentLinkUrl: paymentLink.url });
  } catch (error) {
    console.error("[stripe/checkout]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: "Failed to create payment link", details: error.message, code: error.code },
        { status: 500 },
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
