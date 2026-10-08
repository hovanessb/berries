"use client";

import { useState } from "react";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

/** The /events quote request. Posts to /api/inquiry; falls back to "call us" if email isn't set up. */
export function InquiryForm({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else if (res.status === 400 && json.error) {
        setStatus({ kind: "error", message: json.error });
      } else {
        setStatus({ kind: "error", message: `We couldn't send your request online. Call us at ${phone} and we'll set it up.` });
      }
    } catch {
      setStatus({ kind: "error", message: `No connection. Check your signal, or call us at ${phone}.` });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="bb-form__done" role="status">
        <h3 className="bb-display">Request sent</h3>
        <p>Thanks. We&apos;ll reply by email with availability and a quote for your date.</p>
      </div>
    );
  }

  return (
    <form className="bb-form" onSubmit={onSubmit}>
      <div className="bb-form__grid">
        <label>
          <span>Your name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" inputMode="email" />
        </label>
        <label>
          <span>Phone <small>(optional)</small></span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </label>
        <label>
          <span>Event date</span>
          <input name="date" type="date" required />
        </label>
        <label>
          <span>Guest count</span>
          <input name="guests" type="number" min={1} required inputMode="numeric" />
        </label>
        <label>
          <span>City or venue</span>
          <input name="location" autoComplete="address-level2" />
        </label>
        <label>
          <span>Type of event</span>
          <select name="type" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Birthday or party</option>
            <option>Campus or club event</option>
            <option>Office or team lunch</option>
            <option>Sports team</option>
            <option>Wedding or shower</option>
            <option>Something else</option>
          </select>
        </label>
        <label>
          <span>What you have in mind</span>
          <select name="format" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Our crew builds bowls on site</option>
            <option>Drop-off: bowls or smoothies delivered</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="bb-form__wide">
          <span>Anything else? <small>(optional)</small></span>
          <textarea name="details" rows={4} placeholder="Timing, dietary needs, the vibe you're going for" />
        </label>
        {/* Honeypot for bots; hidden from people and screen readers. */}
        <label className="bb-form__hp" aria-hidden="true">
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status.kind === "error" && <p className="bb-form__error" role="alert">{status.message}</p>}
      <div className="bb-form__actions">
        <button type="submit" className="bb-btn" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Request a quote"}
        </button>
        <span>Or call <a href={phoneHref}>{phone}</a></span>
      </div>
    </form>
  );
}
