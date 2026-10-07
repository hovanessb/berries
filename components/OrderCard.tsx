import Image from "next/image";
import type { MenuItem } from "@/lib/toast/types";
import { HandoffLink } from "./HandoffLink";
import { Sticker } from "./Deco";

export const money = (n: number | null) => (n == null ? "" : `$${n.toFixed(2)}`);

export function Price({ item }: { item: MenuItem }) {
  if (item.price == null) return <span className="bb-price"><small>See sizes</small></span>;
  return (
    <span className="bb-price" aria-label={item.priceFrom ? `from ${money(item.price)}` : undefined}>
      {money(item.price)}{item.priceFrom && "+"}
    </span>
  );
}

/**
 * A white menu tile like the app's: the designer's photo-and-logotype art when we have it,
 * otherwise the Toast photo, otherwise the name set large in the display face.
 */
export function OrderCard({ item, priority }: { item: MenuItem; priority?: boolean }) {
  const { art } = item;
  const wide = art?.wide;
  // Lettered art and the type-only card already show the name; keep the heading for screen readers.
  const showName = art ? !art.lettered : !!item.image;

  return (
    <article className={`bb-card${wide ? " bb-card--wide" : ""}${item.soldOut ? " bb-card--soldout" : ""}`}>
      <div className="bb-card__art">
        {art ? (
          <Image
            src={art.src}
            width={art.width}
            height={art.height}
            alt={art.lettered ? `${item.name}` : ""}
            sizes={wide ? "(min-width: 1180px) 760px, (min-width: 700px) 66vw, 100vw" : "(min-width: 1180px) 370px, (min-width: 700px) 45vw, 100vw"}
            priority={priority}
          />
        ) : item.image ? (
          // Toast's CDN photo; plain <img> so no remotePatterns are needed.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" loading="lazy" style={{ aspectRatio: "800 / 759", objectFit: "cover", width: "100%" }} />
        ) : (
          <div className="bb-card__type" aria-hidden="true">
            <span className="bb-display">{item.name}</span>
          </div>
        )}
        {(item.soldOut || item.sticker) && (
          <span className="bb-card__sticker">
            {item.soldOut ? <Sticker label="86'd today" variant="red" /> : <Sticker label={item.sticker!} />}
          </span>
        )}
      </div>
      <div className="bb-card__body">
        <h3 className={showName ? "bb-card__name" : "visually-hidden"}>{item.name}</h3>
        <p className="bb-card__desc">{item.description}</p>
        <div className="bb-card__foot">
          <Price item={item} />
          {/* Sold-out items show the "86'd today" sticker and no order button. */}
          {!item.soldOut && (
            <HandoffLink href={item.orderUrl} item={item.name} className="bb-btn bb-btn--sm" aria-label={`Order ${item.name} on Toast`}>
              Order
            </HandoffLink>
          )}
        </div>
      </div>
    </article>
  );
}
