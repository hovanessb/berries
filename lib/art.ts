/**
 * Designer artwork for menu items: product shot + the item's own logotype,
 * from the Bomberry app design. Keyed by lowercase item name so it applies to
 * Toast items and the seed menu alike. Items without art get a type-only card.
 */
export interface ItemArt {
  src: string;
  width: number;
  height: number;
  /** The art already includes the item's logotype, so the card hides the text name visually. */
  lettered: boolean;
  /** Landscape art: the card spans two grid columns. */
  wide?: boolean;
}

const lettered = (src: string): ItemArt => ({ src, width: 800, height: 759, lettered: true });

export const ITEM_ART: Record<string, ItemArt> = {
  "bombtella bowl": { src: "/menu/bombtella-bowl.jpg", width: 1400, height: 632, lettered: true, wide: true },
  "bomberry classic": lettered("/menu/bomberry-classic.jpg"),
  "billy's breakfast": lettered("/menu/billys-breakfast.jpg"),
  "tropic boom": lettered("/menu/tropic-boom.jpg"),
  "the heavy hitter": lettered("/menu/the-heavy-hitter.jpg"),
  "baja blitz": lettered("/menu/baja-blitz.jpg"),
  "strawberry smash": lettered("/menu/strawberry-smash.jpg"),
  "midnight ube": { src: "/menu/midnight-ube.jpg", width: 800, height: 907, lettered: false },
};

export const artFor = (name: string): ItemArt | undefined => ITEM_ART[name.toLowerCase().replace(/’/g, "'")];
