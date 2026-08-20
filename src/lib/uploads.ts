import path from "path";

export function resumeDir() {
  if (process.env.VERCEL) return path.join("/tmp", "jobtech-uploads");
  return path.join(process.cwd(), "uploads", "resumes");
}

export function resumePublicPath(filename: string) {
  return `/api/resumes/${encodeURIComponent(filename)}`;
}
