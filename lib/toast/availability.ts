import "server-only";
import { toastGet } from "./client";
import { isToastConfigured, REVALIDATE } from "./config";
import { isOpenByHours } from "../hours";
import type { ToastAvailability } from "./types";

/** Is online ordering taking orders right now? Toast's status when available, posted hours otherwise. */
export async function getOrderingOpen(): Promise<boolean> {
  if (isToastConfigured()) {
    try {
      const a = await toastGet<ToastAvailability>("/restaurant-availability/v1/availability", REVALIDATE.availability);
      return a.status === "ONLINE";
    } catch (err) {
      console.error("[toast] availability failed, using posted hours", err);
    }
  }
  return isOpenByHours();
}
