import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, getStripeSecretKey } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const MIN_EUR = 1;
const MAX_EUR = 500;

type Body = {
  amount?: number | string;
  name?: string;
  email?: string;
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

function parseAmount(raw: number | string | undefined): number | null {
  if (raw === undefined || raw === null || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number(String(raw).replace(",", ".").trim());
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100) / 100;
}

export async function POST(req: Request) {
  try {
    const { amount: amountRaw, name, email } = (await req.json()) as Body;

    const amount = parseAmount(amountRaw);
    if (amount === null || amount < MIN_EUR || amount > MAX_EUR) {
      return NextResponse.json(
        { error: `Enter a monthly amount between €${MIN_EUR} and €${MAX_EUR}.` },
        { status: 400 },
      );
    }

    const trimmedName = (name ?? "").trim();
    const trimmedEmail = (email ?? "").trim().toLowerCase();
    if (!trimmedName) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!getStripeSecretKey()) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Locally: add STRIPE_SECRET_KEY to web/.env.local, then restart. On Vercel: set STRIPE_SECRET_KEY and redeploy.",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const baseUrl = siteUrl();
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: trimmedEmail,
      success_url: `${baseUrl}/creators-club/join?joined=1`,
      cancel_url: `${baseUrl}/creators-club/join?cancelled=1`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountInCents,
            recurring: { interval: "month" },
            product_data: {
              name: "Creators' Lab — Monthly membership",
              description:
                "Monthly membership for the weekly Creators' Lab. Attend live sessions and receive recordings.",
            },
          },
        },
      ],
      subscription_data: {
        metadata: {
          product: "creators-lab",
          memberName: trimmedName,
          memberEmail: trimmedEmail,
          monthlyAmountEur: String(amount),
        },
      },
      metadata: {
        product: "creators-lab",
        memberName: trimmedName,
        memberEmail: trimmedEmail,
        monthlyAmountEur: String(amount),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/creators-lab-checkout]", error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: "Failed to start checkout", details: error.message, code: error.code },
        { status: 500 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
