/** A real guest quote in a cartoon speech balloon. Quotes stay verbatim. */
export function ReviewSlip({ quote, name }: { quote: string; name: string }) {
  return (
    <figure className="bb-balloon">
      <div className="bb-balloon__stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote className="bb-balloon__quote">“{quote}”</blockquote>
      <figcaption className="bb-balloon__who">{name}</figcaption>
    </figure>
  );
}
