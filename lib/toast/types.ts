/** The subset of Toast Menus API v2 we read. */
export type ToastVisibility = "POS" | "KIOSK" | "TOAST_ONLINE_ORDERING" | "ORDERING_PARTNERS" | "GRUBHUB";

export interface ToastMenuItem {
  guid: string;
  name: string;
  description?: string | null;
  image?: string | null;
  visibility?: ToastVisibility[];
  price?: number | null;
  pricingStrategy?: "BASE_PRICE" | "MENU_SPECIFIC_PRICE" | "TIME_SPECIFIC_PRICE" | "SIZE_PRICE" | "OPEN_PRICE";
  calories?: number | null;
  itemTags?: { name: string; guid: string }[];
  sortOrder?: number;
}

export interface ToastMenuGroup {
  guid: string;
  name: string;
  description?: string | null;
  visibility?: ToastVisibility[];
  menuItems?: ToastMenuItem[];
  menuGroups?: ToastMenuGroup[];
}

export interface ToastMenu {
  guid: string;
  name: string;
  visibility?: ToastVisibility[];
  menuGroups: ToastMenuGroup[];
}

export interface ToastMenusResponse {
  restaurantGuid: string;
  lastUpdated: string;
  menus: ToastMenu[];
}

export interface ToastStockItem {
  guid: string;
  status: "IN_STOCK" | "QUANTITY" | "OUT_OF_STOCK";
  quantity: number | null;
}

export interface ToastAvailability {
  restaurantGuid: string;
  status: "ONLINE" | "OFFLINE";
  reasonKey?: string;
  reason?: string;
}

/** What the site renders — Toast data or the seed menu, same shape. */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceFrom: boolean;
  image?: string;
  /** Designer artwork (photo + logotype), see lib/art.ts. */
  art?: import("../art").ItemArt;
  soldOut: boolean;
  orderUrl: string;
  sticker?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuData {
  sections: MenuSection[];
  source: "toast" | "seed";
  lastUpdated?: string;
}
