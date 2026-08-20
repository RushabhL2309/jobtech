import { NextResponse } from "next/server";
import { isDashboardAuthed } from "@/lib/auth";

export async function requireDashboard() {
  if (await isDashboardAuthed()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
