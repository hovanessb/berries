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

const lettered = (src: string): ItemArt => ({ src, width: 760, height: 721, lettered: true });

export const ITEM_ART: Record<string, ItemArt> = {
  "bombtella bowl": { src: "/menu/bombtella-bowl.webp", width: 1200, height: 542, lettered: true, wide: true },
  "bomberry classic": lettered("/menu/bomberry-classic.webp"),
  "billy's breakfast": lettered("/menu/billys-breakfast.webp"),
  "tropic boom": lettered("/menu/tropic-boom.webp"),
  "the heavy hitter": lettered("/menu/the-heavy-hitter.webp"),
  "baja blitz": lettered("/menu/baja-blitz.webp"),
  "strawberry smash": lettered("/menu/strawberry-smash.webp"),
  "midnight ube": { src: "/menu/midnight-ube.webp", width: 760, height: 862, lettered: false },
};

export const artFor = (name: string): ItemArt | undefined => ITEM_ART[name.toLowerCase().replace(/’/g, "'")];
