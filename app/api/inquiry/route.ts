import { NextResponse } from "next/server";

/**
 * POST /api/inquiry — an event/catering quote request from /events.
 * Emails it to INQUIRY_TO_EMAIL through Resend (RESEND_API_KEY). Without those set,
 * it answers 503 and the form asks the guest to call instead.
 */
const FIELDS = ["name", "email", "phone", "date", "guests", "location", "type", "format", "details"] as const;
type Inquiry = Record<(typeof FIELDS)[number], string>;

const LIMITS: Partial<Record<keyof Inquiry, number>> = { details: 2000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Send the form as JSON." }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "company" field.
  if (typeof body.company === "string" && body.company.trim() !== "") return NextResponse.json({ ok: true });

  const data = Object.fromEntries(
    FIELDS.map((f) => [f, typeof body[f] === "string" ? (body[f] as string).trim().slice(0, LIMITS[f] ?? 200) : ""]),
  ) as Inquiry;

  const missing = (["name", "email", "date", "guests"] as const).filter((f) => !data[f]);
  if (missing.length) return NextResponse.json({ ok: false, error: `Please fill in: ${missing.join(", ")}.` }, { status: 400 });
  if (!EMAIL.test(data.email)) return NextResponse.json({ ok: false, error: "That email address doesn't look right." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL || "Bomberry Events <onboarding@resend.dev>";
  if (!key || !to) {
    console.error("[inquiry] RESEND_API_KEY / INQUIRY_TO_EMAIL not set; inquiry not sent", { name: data.name, date: data.date });
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  const rows = FIELDS.map((f) => `<tr><th align="left" style="padding:4px 12px 4px 0">${f}</th><td>${esc(data[f] || "—")}</td></tr>`).join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `Event inquiry: ${data.type || "event"} on ${data.date}, ${data.guests} guests`,
      html: `<h2>New Bomberry event inquiry</h2><table>${rows}</table>`,
    }),
  });
  if (!res.ok) {
    console.error("[inquiry] Resend failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
