"use client";

import { useState } from "react";
import type { Review } from "@/lib/reviews";

/** A real guest quote in a cartoon speech balloon. Quotes stay verbatim. */
export function ReviewSlip({ review, hidden }: { review: Review; hidden?: boolean }) {
  return (
    <figure className="bb-balloon" aria-hidden={hidden || undefined} data-repeat={hidden || undefined}>
      <div className="bb-balloon__stars" role="img" aria-label={`${review.stars} out of 5 stars`}>{"★".repeat(review.stars)}</div>
      <blockquote className="bb-balloon__quote">“{review.quote}”</blockquote>
      <figcaption className="bb-balloon__who">
        {review.href ? (
          <a href={review.href} tabIndex={hidden ? -1 : undefined} rel="noopener" target="_blank">{review.name}</a>
        ) : (
          review.name
        )}
        <span className="bb-balloon__src">{review.source === "google" ? `Google${review.when ? `, ${review.when}` : ""}` : "DoorDash"}</span>
      </figcaption>
    </figure>
  );
}

/**
 * An endless, slowly drifting row of review balloons. The list renders twice so the
 * loop is seamless (the copy is hidden from screen readers). It pauses on hover and
 * keyboard focus, and has a pause button; with reduced motion it becomes a swipeable row.
 */
export function ReviewMarquee({ reviews }: { reviews: Review[] }) {
  const [paused, setPaused] = useState(false);
  if (reviews.length === 0) return null;

  // Repeat short lists so one set is wider than any screen; then the second set makes the loop seamless.
  const MIN_PER_SET = 6;
  const set: { review: Review; repeat: boolean }[] = [];
  for (let round = 0; set.length < MIN_PER_SET || round === 0; round++) {
    reviews.forEach((review) => set.push({ review, repeat: round > 0 }));
  }
  // Seconds per balloon keeps the drift speed the same however many there are.
  const style = { "--bb-loop": `${set.length * 9}s` } as React.CSSProperties;

  return (
    <div className={`bb-marquee${paused ? " is-paused" : ""}`} style={style}>
      <div className="bb-marquee__track">
        <div className="bb-marquee__set">
          {set.map(({ review, repeat }, i) => <ReviewSlip key={`a${i}`} review={review} hidden={repeat} />)}
        </div>
        <div className="bb-marquee__set bb-marquee__copy" aria-hidden="true">
          {set.map(({ review }, i) => <ReviewSlip key={`b${i}`} review={review} hidden />)}
        </div>
      </div>
      <button type="button" className="bb-marquee__toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
        {paused ? "Play reviews" : "Pause reviews"}
      </button>
    </div>
  );
}
