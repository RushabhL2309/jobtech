import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkCredentials, DASH_COOKIE, dashboardToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string } | null;
  if (!body?.email || !body.password || !checkCredentials(body.email, body.password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  const jar = await cookies();
  jar.set(DASH_COOKIE, dashboardToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(DASH_COOKIE);
  return NextResponse.json({ ok: true });
}
