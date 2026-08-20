import { NextResponse } from "next/server";
import { addJob, deleteJob, getJobs } from "@/lib/store";
import { requireDashboard } from "@/lib/require-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const denied = await requireDashboard();
  if (denied) return denied;
  const body = (await req.json().catch(() => null)) as {
    title?: string;
    location?: string;
    type?: string;
    industry?: string;
    pay?: string;
    summary?: string;
  } | null;
  if (!body?.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const job = await addJob({
    title: body.title.trim(),
    location: (body.location || "Mumbai").trim(),
    type: (body.type || "Full-time").trim(),
    industry: (body.industry || "General").trim(),
    pay: (body.pay || "As per experience").trim(),
    summary: (body.summary || "").trim(),
  });
  return NextResponse.json(job);
}

export async function DELETE(req: Request) {
  const denied = await requireDashboard();
  if (denied) return denied;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const ok = await deleteJob(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
