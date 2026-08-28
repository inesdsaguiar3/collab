import { NextResponse } from "next/server";

interface Payload {
  source?: string;
  answers?: Record<string, string>;
  recommendation?: string;
  contact?: {
    name?: string;
    email?: string;
  };
  submittedAt?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    const email = body?.contact?.email?.trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Phase 1 capture: structured server logging, ready for CRM/Airtable integration.
    console.log("[path-finder-lead]", {
      source: body.source ?? "homepage_path_finder",
      recommendation: body.recommendation ?? "unknown",
      answers: body.answers ?? {},
      contact: {
        name: body.contact?.name ?? "",
        email,
      },
      submittedAt: body.submittedAt ?? new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
