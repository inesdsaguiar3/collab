import { NextResponse } from "next/server";
import { escapeHtml, getResend } from "@/lib/resend";
import { embodiedVisionLab } from "@/content/embodied-vision-lab";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const BUSINESS_STAGES = embodiedVisionLab.form.businessStageOptions;
const ATTENDANCE = embodiedVisionLab.form.attendanceOptions;
const COLIVING = embodiedVisionLab.form.colivingInterestOptions;

type Body = {
  fullName?: string;
  email?: string;
  websiteOrInstagram?: string;
  workOffer?: string;
  businessStage?: string;
  developMost?: string;
  whyNow?: string;
  attendance?: string;
  colivingInterest?: string;
  anythingElse?: string;
  privacyAck?: boolean;
  marketingOptIn?: boolean;
  /** Honeypot — must stay empty */
  company?: string;
};

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return (options as readonly string[]).includes(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // Spam honeypot
    if (body.company?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const websiteOrInstagram = body.websiteOrInstagram?.trim() ?? "";
    const workOffer = body.workOffer?.trim() ?? "";
    const businessStage = body.businessStage?.trim() ?? "";
    const developMost = body.developMost?.trim() ?? "";
    const whyNow = body.whyNow?.trim() ?? "";
    const attendance = body.attendance?.trim() ?? "";
    const colivingInterest = body.colivingInterest?.trim() ?? "";
    const anythingElse = body.anythingElse?.trim() ?? "";
    const privacyAck = Boolean(body.privacyAck);
    const marketingOptIn = Boolean(body.marketingOptIn);

    if (!fullName || fullName.length > 160) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!email || !emailOk(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (websiteOrInstagram.length > 300) {
      return NextResponse.json({ error: "Website or Instagram is too long." }, { status: 400 });
    }
    if (!workOffer || workOffer.length > 4000) {
      return NextResponse.json(
        { error: "Please tell us about your work and what you currently offer." },
        { status: 400 },
      );
    }
    if (!businessStage || !isOneOf(businessStage, BUSINESS_STAGES)) {
      return NextResponse.json({ error: "Please select where you are in your business." }, { status: 400 });
    }
    if (!developMost || developMost.length > 4000) {
      return NextResponse.json(
        { error: "Please share what you would most like to develop." },
        { status: 400 },
      );
    }
    if (!whyNow || whyNow.length > 4000) {
      return NextResponse.json(
        { error: "Please share why this feels like the right time." },
        { status: 400 },
      );
    }
    if (!attendance || !isOneOf(attendance, ATTENDANCE)) {
      return NextResponse.json({ error: "Please confirm your attendance availability." }, { status: 400 });
    }
    if (colivingInterest && !isOneOf(colivingInterest, COLIVING)) {
      return NextResponse.json({ error: "Please choose a valid co-living option." }, { status: 400 });
    }
    if (anythingElse.length > 4000) {
      return NextResponse.json({ error: "Additional notes are too long." }, { status: 400 });
    }
    if (!privacyAck) {
      return NextResponse.json(
        { error: "Please confirm you have read the privacy notice." },
        { status: 400 },
      );
    }

    const fromEmail = process.env.FROM_EMAIL?.trim();
    if (!process.env.RESEND_API_KEY || !fromEmail) {
      console.error("[embodied-vision-lab-apply] Missing email config", {
        hasResendApiKey: !!process.env.RESEND_API_KEY,
        hasFromEmail: !!fromEmail,
      });
      return NextResponse.json(
        {
          error:
            "Applications are not configured yet. Please email us directly or try again later.",
        },
        { status: 503 },
      );
    }

    const submittedAt = new Date().toISOString();
    // Do not log application answers
    console.log("[embodied-vision-lab-apply]", { email, submittedAt });

    const resend = getResend();
    const { error: sendError } = await resend.emails.send({
      from: `Co-llab <${fromEmail}>`,
      to: fromEmail,
      replyTo: email,
      subject: `Embodied Vision Lab application · ${fullName}`,
      html: `
        <h1>New Embodied Vision Lab application</h1>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Website / Instagram:</strong> ${escapeHtml(websiteOrInstagram || "—")}</p>
        <p><strong>Work &amp; offer:</strong></p>
        <p>${escapeHtml(workOffer).replace(/\n/g, "<br/>")}</p>
        <p><strong>Business stage:</strong> ${escapeHtml(businessStage)}</p>
        <p><strong>Most like to develop:</strong></p>
        <p>${escapeHtml(developMost).replace(/\n/g, "<br/>")}</p>
        <p><strong>Why now:</strong></p>
        <p>${escapeHtml(whyNow).replace(/\n/g, "<br/>")}</p>
        <p><strong>Attendance:</strong> ${escapeHtml(attendance)}</p>
        <p><strong>Co-living interest:</strong> ${escapeHtml(colivingInterest || "—")}</p>
        <p><strong>Anything else:</strong></p>
        <p>${escapeHtml(anythingElse || "—").replace(/\n/g, "<br/>")}</p>
        <p><strong>Privacy acknowledged:</strong> yes</p>
        <p><strong>Marketing opt-in:</strong> ${marketingOptIn ? "yes" : "no"}</p>
        <p><strong>Time (UTC):</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    if (sendError) {
      console.error("[embodied-vision-lab-apply] Resend send error:", sendError);
      return NextResponse.json(
        { error: "Could not submit your application right now. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
