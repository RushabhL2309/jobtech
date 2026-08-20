import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isDashboardAuthed } from "@/lib/auth";
import { resumeDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await params;
  const name = path.basename(file);
  if (!name || name !== file) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  try {
    const buf = await readFile(path.join(resumeDir(), name));
    const lower = name.toLowerCase();
    const type = lower.endsWith(".pdf")
      ? "application/pdf"
      : lower.endsWith(".docx")
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/msword";
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": type,
        "Content-Disposition": `inline; filename="${name}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
