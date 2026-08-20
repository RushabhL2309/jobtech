import { NextResponse } from "next/server";
import { addEnquiry, getEnquiries } from "@/lib/store";
import { requireDashboard } from "@/lib/require-auth";
import { sendEnquiryMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireDashboard();
  if (denied) return denied;
  return NextResponse.json(await getEnquiries());
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
    city?: string;
    service?: string;
    workforce?: string;
    message?: string;
  } | null;
  if (!body?.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: "Name, phone and message are required" }, { status: 400 });
  }
  const row = await addEnquiry({
    name: body.name.trim(),
    company: (body.company || "").trim(),
    phone: body.phone.trim(),
    email: (body.email || "").trim(),
    city: (body.city || "").trim(),
    service: (body.service || "").trim(),
    workforce: (body.workforce || "").trim(),
    message: body.message.trim(),
  });
  await sendEnquiryMail(row);
  return NextResponse.json({ ok: true, id: row.id });
}
