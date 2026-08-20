import { cookies } from "next/headers";
import { createHmac } from "crypto";

export const DASH_COOKIE = "jobtech_dash";

function email() {
  return (process.env.DASHBOARD_EMAIL || "admin@gmail.com").trim().toLowerCase();
}

function password() {
  return process.env.DASHBOARD_PASSWORD || "admin@123";
}

function secret() {
  return process.env.DASHBOARD_SECRET || "jobtech-local-secret";
}

export function dashboardToken() {
  return createHmac("sha256", secret()).update(`${email()}:${password()}`).digest("hex");
}

export function checkCredentials(inputEmail: string, inputPassword: string) {
  return inputEmail.trim().toLowerCase() === email() && inputPassword === password();
}

export async function isDashboardAuthed() {
  const jar = await cookies();
  return jar.get(DASH_COOKIE)?.value === dashboardToken();
}
