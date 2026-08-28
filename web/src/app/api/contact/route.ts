import { NextResponse } from "next/server";
import { escapeHtml, getResend } from "@/lib/resend";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const TOPICS = ["retreat", "coliving", "partnership", "work", "other"] as const;
type Topic = (typeof TOPICS)[number];

const topicLabel: Record<Topic, string> = {
  retreat: "Retreat inquiry",
  coliving: "Co-Living inquiry",
  partnership: "Partnership / collab",
  work: "Work with us",
  other: "Just saying hi",
};

function isTopic(v: string): v is Topic {
  return (TOPICS as readonly string[]).includes(v);
}

/**
 * Contact (“Say hi”) — same Resend setup as Casa do Sol: `RESEND_API_KEY` + `FROM_EMAIL`.
 * `replyTo` is the visitor so you can reply from your mail client.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      topic?: string;
      message?: string;
    };

    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const topicRaw = body.topic?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "Please add your first and last name." }, { status: 400 });
    }
    if (firstName.length > 120 || lastName.length > 120) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (!email || !emailOk(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!topicRaw || !isTopic(topicRaw)) {
      return NextResponse.json({ error: "Please choose a topic." }, { status: 400 });
    }
    if (!message || message.length > 12000) {
      return NextResponse.json({ error: "Please add a message (max 12,000 characters)." }, { status: 400 });
    }

    const topic = topicRaw;
    const submittedAt = new Date().toISOString();
    const name = `${firstName} ${lastName}`.trim();

    console.log("[contact-request]", {
      name,
      email,
      topic: topicLabel[topic],
      messagePreview: message.slice(0, 200),
      submittedAt,
    });

    const fromEmail = process.env.FROM_EMAIL?.trim();
    if (!process.env.RESEND_API_KEY || !fromEmail) {
      console.error("[contact-request] Missing email config", {
        hasResendApiKey: !!process.env.RESEND_API_KEY,
        hasFromEmail: !!fromEmail,
      });
      return NextResponse.json(
        { error: "Contact email is not configured yet. Please try again later." },
        { status: 500 },
      );
    }

    try {
      const resend = getResend();
      const { error: sendError } = await resend.emails.send({
        from: `Co-llab <${fromEmail}>`,
        to: fromEmail,
        replyTo: email,
        subject: `Co-llab contact · ${topicLabel[topic]}`,
        html: `
          <h1>New contact message</h1>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Topic:</strong> ${escapeHtml(topicLabel[topic])}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
          <p><strong>Time (UTC):</strong> ${escapeHtml(submittedAt)}</p>
        `,
      });

      if (sendError) {
        console.error("[contact-request] Resend send error:", sendError);
        return NextResponse.json(
          { error: "Could not send your message right now. Please try again later." },
          { status: 500 },
        );
      }
    } catch (err) {
      console.error("[contact-request] Resend error:", err);
      return NextResponse.json(
        { error: "Could not send your message right now. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
