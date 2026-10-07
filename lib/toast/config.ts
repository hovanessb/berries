import "server-only";

/** Toast Standard API access is READ-ONLY (GET requests only). We never create orders or take payment here. */
export const TOAST = {
  host: (process.env.TOAST_API_HOST || "https://ws-api.toasttab.com").replace(/\/$/, ""),
  clientId: process.env.TOAST_CLIENT_ID || "",
  clientSecret: process.env.TOAST_CLIENT_SECRET || "",
  restaurantGuid: process.env.TOAST_RESTAURANT_GUID || "",
};

export const isToastConfigured = () => Boolean(TOAST.clientId && TOAST.clientSecret && TOAST.restaurantGuid);

/** Cache windows, in seconds. Toast suggests polling availability about every 10 minutes. */
export const REVALIDATE = { menu: 900, stock: 120, availability: 600 } as const;
