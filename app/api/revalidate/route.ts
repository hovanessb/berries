import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate?secret=…  → refetch the Toast menu, stock, status and Google reviews now
 * (e.g. right after editing the menu in Toast Web). Otherwise it refreshes on its own.
 */
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag("toast", "max");
  revalidateTag("reviews", "max");
  return NextResponse.json({ ok: true, revalidated: ["toast", "reviews"] });
}
