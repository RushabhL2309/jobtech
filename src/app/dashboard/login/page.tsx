import { redirect } from "next/navigation";
import { isDashboardAuthed } from "@/lib/auth";
import LoginPage from "./login-form";

export const dynamic = "force-dynamic";

export default async function DashboardLogin() {
  if (await isDashboardAuthed()) redirect("/dashboard");
  return <LoginPage />;
}
