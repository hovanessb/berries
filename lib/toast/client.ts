import "server-only";
import { TOAST } from "./config";

type LoginResponse = {
  token: { tokenType: string; accessToken: string; expiresIn: number };
  status: string;
};

let cached: { token: string; expiresAt: number } | null = null;

/** Machine-client login. Tokens last several hours; we reuse one until a minute before expiry. */
async function getAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.token;
  const res = await fetch(`${TOAST.host}/authentication/v1/authentication/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: TOAST.clientId,
      clientSecret: TOAST.clientSecret,
      userAccessType: "TOAST_MACHINE_CLIENT",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Toast login failed: ${res.status}`);
  const data = (await res.json()) as LoginResponse;
  cached = { token: data.token.accessToken, expiresAt: Date.now() + data.token.expiresIn * 1000 };
  return cached.token;
}

/** GET a Toast endpoint for this restaurant, cached by Next for `revalidate` seconds. */
export async function toastGet<T>(path: string, revalidate: number): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${TOAST.host}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Toast-Restaurant-External-ID": TOAST.restaurantGuid,
    },
    next: { revalidate, tags: ["toast"] },
  });
  if (res.status === 401) cached = null; // force a fresh login next time
  if (!res.ok) throw new Error(`Toast GET ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}
