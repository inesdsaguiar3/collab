import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  ADD_ONS,
  PACKAGE_DEFS,
  ROOM_RATES,
  STAY_LENGTHS,
  calculateStayTotal,
  colivingWeeklyTotalForRoom,
  filterAddOnsForStay,
  type AddOnId,
  type PackageId,
  type RoomId,
  type StayLengthId,
  isEarlyBirdActive,
} from "@/lib/pricing";
import { checkOutForStay, isValidCheckIn } from "@/lib/stayAvailability";
import { getStripe, getStripeSecretKey } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type Body = {
  roomId?: string;
  stayLengthId?: string;
  addOnIds?: string[];
  checkInDate?: string;
  packageId?: string;
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

function isRoomId(value: string): value is RoomId {
  return value in ROOM_RATES;
}

function isStayLengthId(value: string): value is StayLengthId {
  return value in STAY_LENGTHS;
}

function isAddOnId(value: string): value is AddOnId {
  return value in ADD_ONS;
}

function isPackageId(value: string): value is PackageId {
  return value in PACKAGE_DEFS;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { roomId, stayLengthId, checkInDate, packageId } = body;
    const rawAddOns = Array.isArray(body.addOnIds) ? body.addOnIds : [];

    if (!roomId || !stayLengthId || !checkInDate) {
      return NextResponse.json(
        { error: "Missing roomId, stayLengthId, or checkInDate" },
        { status: 400 },
      );
    }
    if (!isRoomId(roomId) || !isStayLengthId(stayLengthId)) {
      return NextResponse.json({ error: "Invalid room or stay length" }, { status: 400 });
    }
    if (!rawAddOns.every(isAddOnId)) {
      return NextResponse.json({ error: "Invalid add-ons" }, { status: 400 });
    }
    if (!isValidCheckIn(stayLengthId, checkInDate)) {
      return NextResponse.json(
        { error: "Selected dates are not available. Choose 1–14 Sep or 1 Oct – 30 Nov 2026." },
        { status: 400 },
      );
    }

    const addOnIds = filterAddOnsForStay(stayLengthId, rawAddOns);
    const nights = STAY_LENGTHS[stayLengthId].nights;
    const checkOutDate = checkOutForStay(stayLengthId, checkInDate);

    let totalAmount = calculateStayTotal({ roomId, stayLengthId, addOnIds });

    // Early-bird fixed totals for standard weekly coliving packages:
    // - Shared room: 444
    // - Private room + Suite tier: 666
    // - Studio: 777
    // Regular totals are a premium over early-bird (to preserve the discount feel).
    const standardWeeklyColiving =
      stayLengthId === "weekly" && addOnIds.includes("fullBoard") && addOnIds.includes("morningYoga");
    if (standardWeeklyColiving) {
      const earlyBirdActive = isEarlyBirdActive();
      totalAmount = colivingWeeklyTotalForRoom(roomId, earlyBirdActive);
    }

    const amountInCents = Math.round(totalAmount * 100);

    if (!Number.isFinite(amountInCents) || amountInCents <= 0) {
      return NextResponse.json({ error: "Invalid stay total" }, { status: 400 });
    }

    if (!getStripeSecretKey()) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY in web/.env.local and restart the dev server.",
        },
        { status: 503 },
      );
    }

    const packageName =
      packageId && isPackageId(packageId) ? PACKAGE_DEFS[packageId].name : null;
    const roomLabel = ROOM_RATES[roomId].label;
    const stayLabel = STAY_LENGTHS[stayLengthId].label;
    const addOnLabels = addOnIds.map((id) => ADD_ONS[id].label).join(", ") || "none";
    const productName = packageName
      ? `Casa do Sol — ${packageName}`
      : `Casa do Sol — ${roomLabel} (${stayLabel})`;

    const stripe = getStripe();
    const baseUrl = siteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/rates?booking=success`,
      cancel_url: `${baseUrl}/rates?booking=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountInCents,
            product_data: {
              name: productName,
              description: (() => {
                const earlyBirdNote =
                  standardWeeklyColiving && isEarlyBirdActive()
                    ? " · Early Bird pricing applied"
                    : "";
                return `${checkInDate} to ${checkOutDate} · ${nights} nights · ${stayLabel} · add-ons: ${addOnLabels}${earlyBirdNote}`;
              })(),
            },
          },
        },
      ],
      metadata: {
        source: "rates",
        location: "Casa do Sol",
        roomId,
        stayLengthId,
        packageId: packageId && isPackageId(packageId) ? packageId : "",
        addOnIds: addOnIds.join(","),
        checkInDate,
        checkOutDate,
        nights: String(nights),
        totalAmount: String(totalAmount),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/rates-checkout]", error);
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
