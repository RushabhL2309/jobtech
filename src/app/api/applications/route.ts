import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { addApplication, getApplications } from "@/lib/store";
import { requireDashboard } from "@/lib/require-auth";
import { sendApplicationMail } from "@/lib/mail";
import { resumeDir, resumePublicPath } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const MAX = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
}

export async function GET() {
  const denied = await requireDashboard();
  if (denied) return denied;
  return NextResponse.json(await getApplications());
}

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const email = String(form.get("email") || "").trim();
  const role = String(form.get("role") || "").trim();
  const message = String(form.get("message") || "").trim();
  const resume = form.get("resume");

  if (!name || !phone || !role || !(resume instanceof File)) {
    return NextResponse.json({ error: "Name, phone, role and resume are required" }, { status: 400 });
  }
  if (resume.size > MAX) {
    return NextResponse.json({ error: "Resume must be under 5 MB" }, { status: 400 });
  }
  if (resume.type && !ALLOWED.has(resume.type)) {
    return NextResponse.json({ error: "Upload a PDF or Word document" }, { status: 400 });
  }

  const filename = `${Date.now()}-${safeName(resume.name || "resume.pdf")}`;
  const buf = Buffer.from(await resume.arrayBuffer());
  const dir = resumeDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buf);

  const row = await addApplication({
    name,
    phone,
    email,
    role,
    message,
    resumeUrl: resumePublicPath(filename),
    resumeName: resume.name || filename,
  });
  await sendApplicationMail({
    name: row.name,
    phone: row.phone,
    email: row.email,
    role: row.role,
    message: row.message,
    resumeName: row.resumeName,
    resume: buf,
  });
  return NextResponse.json({ ok: true, id: row.id });
}
