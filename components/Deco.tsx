/** The cartoon iris: five paper-cut red rings. Position the centre with --cx / --cy in CSS. */
export function Iris() {
  return (
    <div className="bb-iris" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

/** The shop's black-and-white checker floor. Decorative only. */
export function CheckerBand({ double }: { double?: boolean }) {
  return <div className={`bb-checker${double ? " bb-checker--double" : ""}`} aria-hidden="true" />;
}

export function Sticker({ label, variant }: { label: string; variant?: "red" }) {
  return <span className={`bb-sticker${variant ? ` bb-sticker--${variant}` : ""}`}>{label}</span>;
}
