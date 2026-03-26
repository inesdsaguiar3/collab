import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getRetreatBySlug } from "@/lib/mdx";

type Body = {
  slug: string;
  offerName: string;
};

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

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
      (o) => (o.name || "").trim().toLowerCase() === offerName.trim().toLowerCase()
    );
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    const secretKey = requiredEnv("STRIPE_SECRET_KEY");
    const siteUrl = requiredEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");

    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-02-25.clover",
    });

    // Stripe uses the smallest currency unit (e.g. cents)
    const unitAmount = Math.round(Number(offer.price) * 100);
    if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
      return NextResponse.json({ error: "Invalid offer price" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: (offer.priceCurrency || "EUR").toLowerCase(),
            unit_amount: unitAmount,
            product_data: {
              name: `${retreat.frontmatter.title} — ${offerName}`,
              description: retreat.frontmatter.location,
              images: retreat.frontmatter.mainImageUrl ? [`${siteUrl}${retreat.frontmatter.mainImageUrl}`] : undefined,
            },
          },
        },
      ],
      success_url: `${siteUrl}/retreats/${slug}?success=1`,
      cancel_url: `${siteUrl}/retreats/${slug}?canceled=1`,
      metadata: {
        retreatSlug: slug,
        offerName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

