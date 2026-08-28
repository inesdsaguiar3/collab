import { NextResponse } from "next/server";
import { escapeHtml, getResend } from "@/lib/resend";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Newsletter — Resend:
 * - **`RESEND_AUDIENCE_ID`**: adds the address to that Audience (dashboard → Audiences → ID).
 * - **`FROM_EMAIL`** (optional): also sends you a short “new signup” email, same as before.
 * - Requires **`RESEND_API_KEY`** for either path.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = body?.email?.trim();

    if (!email || !emailOk(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    console.log("[newsletter-signup]", { email, submittedAt });

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();
    const fromEmail = process.env.FROM_EMAIL?.trim();

    if (!apiKey) {
      console.error("[newsletter-signup] Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Newsletter email is not configured yet. Please try again later." },
        { status: 500 },
      );
    }

    const resend = getResend();

    if (audienceId) {
      const { error: contactError } = await resend.contacts.create({
        audienceId,
        email,
        unsubscribed: false,
      });

      if (contactError) {
        console.error("[newsletter-signup] Resend contacts error:", contactError);
        return NextResponse.json(
          { error: "Could not complete signup right now. Please try again later." },
          { status: 500 },
        );
      }
    } else if (!fromEmail) {
      console.warn(
        "[newsletter-signup] Set RESEND_AUDIENCE_ID (and/or FROM_EMAIL) to capture signups via Resend.",
      );
    }

    if (fromEmail) {
      try {
        const { error: sendError } = await resend.emails.send({
          from: `Co-llab <${fromEmail}>`,
          to: fromEmail,
          subject: "New Co-llab newsletter signup",
          html: `
            <h1>New newsletter signup</h1>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Time (UTC):</strong> ${escapeHtml(submittedAt)}</p>
            ${audienceId ? `<p><em>Also added to Resend audience <code>${escapeHtml(audienceId)}</code>.</em></p>` : ""}
          `,
        });
        if (sendError) {
          console.error("[newsletter-signup] Resend send error:", sendError);
          if (!audienceId) {
            return NextResponse.json(
              { error: "Could not complete signup right now. Please try again later." },
              { status: 500 },
            );
          }
        }
      } catch (err) {
        console.error("[newsletter-signup] Resend email error:", err);
        if (!audienceId) {
          return NextResponse.json(
            { error: "Could not complete signup right now. Please try again later." },
            { status: 500 },
          );
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
