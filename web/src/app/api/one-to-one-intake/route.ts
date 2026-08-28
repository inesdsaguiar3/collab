import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { escapeHtml, getResend } from "@/lib/resend";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const EBOOK_URL = "https://www.collab.living/ebook.pdf";
const EBOOK_TITLE = "A Short Guide to Nervous System States";
const EBOOK_FILENAME = "nervous-system-states-guide.pdf";

function loadEbookAttachment(): { filename: string; content: Buffer } | undefined {
  const candidates = [
    path.join(process.cwd(), "public", "ebook.pdf"),
    path.join(process.cwd(), "web", "public", "ebook.pdf"),
  ];
  for (const filePath of candidates) {
    try {
      const content = readFileSync(filePath);
      return { filename: EBOOK_FILENAME, content };
    } catch {
      /* try next */
    }
  }
  console.error("[one-to-one-intake] ebook.pdf not found on disk");
  return undefined;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      state?: string;
      timezone?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const state = body.state?.trim() ?? "unspecified";
    const timezone = body.timezone?.trim() ?? "";

    if (!name) {
      return NextResponse.json({ error: "Please add your name." }, { status: 400 });
    }
    if (!email || !emailOk(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const fromEmail = process.env.FROM_EMAIL?.trim();
    if (!process.env.RESEND_API_KEY || !fromEmail) {
      console.error("[one-to-one-intake] Missing email config");
      return NextResponse.json({ error: "Email not configured." }, { status: 500 });
    }

    const resend = getResend();
    const submittedAt = new Date().toISOString();

    // ── 1. Notify Inês ──────────────────────────────────────────────
    const { error: notifyError } = await resend.emails.send({
      from: `Co-llab <${fromEmail}>`,
      to: fromEmail,
      replyTo: email,
      subject: `1:1 session request · ${escapeHtml(name)}`,
      html: `
        <h2>New 1:1 session request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Current state:</strong> ${escapeHtml(state)}</p>
        ${timezone ? `<p><strong>Timezone:</strong> ${escapeHtml(timezone)}</p>` : ""}
        <p><strong>Time (UTC):</strong> ${escapeHtml(submittedAt)}</p>
      `,
    });

    if (notifyError) {
      console.error("[one-to-one-intake] Notify send error:", notifyError);
      return NextResponse.json({ error: "Could not send. Please try again." }, { status: 500 });
    }

    // ── 2. Send ebook to the person ──────────────────────────────────
    const attachment = loadEbookAttachment();

    const { error: ebookError } = await resend.emails.send({
      from: `Inês · Co-llab <${fromEmail}>`,
      to: email,
      replyTo: fromEmail,
      subject: `Your free guide — ${EBOOK_TITLE}`,
      html: `
        <p>Hi ${escapeHtml(name)},</p>

        <p>Thank you for reaching out. I'll be back to you within a couple of days.</p>

        <p>In the meantime, here is the guide I mentioned — attached to this email, and also available to download:</p>

        <p>
          <strong>
            <a href="${EBOOK_URL}" style="color:#7F5AA1;">${EBOOK_TITLE}</a>
          </strong>
        </p>

        <p>
          It covers the five nervous system states, what each one feels like from the inside,
          and a few simple practices to support each one. Nothing overwhelming — just a quiet starting point.
        </p>

        <p>Talk soon,<br/>Inês</p>
      `,
      ...(attachment ? { attachments: [attachment] } : {}),
    });

    if (ebookError) {
      // Notify went through — log ebook failure but don't error the user
      console.error("[one-to-one-intake] Ebook send error:", ebookError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
