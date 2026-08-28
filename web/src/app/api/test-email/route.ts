import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

/**
 * Same idea as `casadosol` — POST to verify Resend + `FROM_EMAIL` in production.
 */
export async function POST() {
  try {
    const fromEmail = process.env.FROM_EMAIL?.trim();
    if (!fromEmail) {
      return NextResponse.json({ error: "FROM_EMAIL not configured" }, { status: 500 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const resend = getResend();
    const { data, error: sendError } = await resend.emails.send({
      from: `Co-llab <${fromEmail}>`,
      to: fromEmail,
      subject: "Test email — Co-llab website",
      html: `
        <h1>Test email</h1>
        <p>This confirms Resend is configured like Casa do Sol.</p>
        <p>Sent from: ${fromEmail}</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
    });
    if (sendError) {
      return NextResponse.json(
        {
          error: "Failed to send test email",
          details: sendError.message ?? "Resend send failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Test email sent successfully!",
        id: data?.id ?? null,
        fromEmail,
        hasApiKey: !!process.env.RESEND_API_KEY,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json(
      {
        error: "Failed to send test email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
