/** Checkout lives on Toast. These build the hand-off links. */
export const ORDER_URL = (
  process.env.NEXT_PUBLIC_TOAST_ORDER_URL || "https://www.toasttab.com/local/order/bomberry-1223-n-grand-ave"
).replace(/\/$/, "");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Deep link to one item on Toast online ordering, e.g.
 * .../bomberry-1223-n-grand-ave/item-midnight-ube_2d558960-b1aa-458b-9a56-b5cdb2599751
 * Without a Toast GUID we fall back to the full menu.
 */
export function itemOrderUrl(name: string, guid?: string) {
  return guid ? `${ORDER_URL}/item-${slugify(name)}_${guid}` : ORDER_URL;
}
