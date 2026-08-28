import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, getStripeSecretKey } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type Body = {
  stayType?: "weekly" | "monthly";
  checkInDate?: string;
  checkOutDate?: string;
  accommodationType?: "private" | "shared";
  includeFood?: boolean;
};

const PRIVATE_ROOM_RATE_EUR = 50;
const SHARED_ROOM_RATE_EUR = 30;
const FOOD_PER_WEEK_EUR = 70;

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

function daysBetween(startIso: string, endIso: string): number {
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  const ms = end.getTime() - start.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export async function POST(req: Request) {
  try {
    const { stayType, checkInDate, checkOutDate, accommodationType, includeFood } = (await req.json()) as Body;
    if (!stayType || !checkInDate || !checkOutDate || !accommodationType) {
      return NextResponse.json({ error: "Missing stayType, accommodationType, or dates" }, { status: 400 });
    }
    if (stayType !== "weekly" && stayType !== "monthly") {
      return NextResponse.json({ error: "Invalid stayType" }, { status: 400 });
    }
    if (accommodationType !== "private" && accommodationType !== "shared") {
      return NextResponse.json({ error: "Invalid accommodationType" }, { status: 400 });
    }

    const nights = daysBetween(checkInDate, checkOutDate);
    if (!Number.isFinite(nights) || nights <= 0) {
      return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
    }

    const minNights = stayType === "weekly" ? 6 : 28;
    if (nights < minNights) {
      return NextResponse.json(
        { error: `Minimum stay for ${stayType} bookings is ${minNights} nights.` },
        { status: 400 },
      );
    }

    const blocks = stayType === "weekly" ? Math.ceil(nights / 6) : Math.ceil(nights / 30);
    const roomRate = accommodationType === "private" ? PRIVATE_ROOM_RATE_EUR : SHARED_ROOM_RATE_EUR;
    const accommodationTotal = roomRate * nights;
    const foodTotal = includeFood ? Math.ceil(nights / 7) * FOOD_PER_WEEK_EUR : 0;
    const totalAmount = accommodationTotal + foodTotal;

    if (!getStripeSecretKey()) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY in web/.env.local and restart the dev server.",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const baseUrl = siteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/coliving?booking=success`,
      cancel_url: `${baseUrl}/coliving?booking=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(totalAmount * 100),
            product_data: {
              name: `Casa do Sol Coliving (${accommodationType === "private" ? "Private room" : "Shared room"})`,
              description: `${checkInDate} to ${checkOutDate} (${nights} nights, ${stayType} stay, ${includeFood ? "with food" : "no food"})`,
            },
          },
        },
      ],
      metadata: {
        location: "Casa do Sol",
        stayType,
        accommodationType,
        includeFood: includeFood ? "yes" : "no",
        checkInDate,
        checkOutDate,
        nights: String(nights),
        blocks: String(blocks),
        accommodationTotal: String(accommodationTotal),
        foodTotal: String(foodTotal),
        totalAmount: String(totalAmount),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/coliving-checkout]", error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: "Failed to create checkout session", details: error.message, code: error.code },
        { status: 500 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
