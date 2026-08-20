import { redirect } from "next/navigation";
import { isDashboardAuthed } from "@/lib/auth";
import { getApplications, getEnquiries, getJobs } from "@/lib/store";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await isDashboardAuthed())) redirect("/dashboard/login");
  const [jobs, enquiries, applications] = await Promise.all([
    getJobs(),
    getEnquiries(),
    getApplications(),
  ]);
  return <DashboardClient jobs={jobs} enquiries={enquiries} applications={applications} />;
}
