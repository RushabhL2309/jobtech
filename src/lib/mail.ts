import { Resend } from "resend";
import { company } from "@/data/site";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rows(fields: [string, string][]) {
  return fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;width:160px;vertical-align:top">${esc(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a">${esc(value || "—")}</td></tr>`,
    )
    .join("");
}

function wrap(title: string, table: string) {
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#4B2C84;font-weight:600">Jobtech</p>
    <h1 style="font-size:20px;margin:8px 0 16px;color:#0f172a">${esc(title)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${table}</table>
  </div>`;
}

function mailTo() {
  return process.env.MAIL_TO || company.email;
}

function mailFrom() {
  return process.env.MAIL_FROM || "Jobtech <onboarding@resend.dev>";
}

async function send(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — enquiry/career email skipped.");
    return;
  }
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: mailFrom(),
      to: mailTo(),
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo || undefined,
      attachments: opts.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });
    if (error) {
      console.error("Resend failed:", error);
    }
  } catch (err) {
    console.error("Resend failed:", err);
  }
}

export async function sendEnquiryMail(data: {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  workforce: string;
  message: string;
}) {
  await send({
    subject: `Service enquiry — ${data.name}${data.service ? ` (${data.service})` : ""}`,
    replyTo: data.email || undefined,
    html: wrap(
      "New service enquiry",
      rows([
        ["Name", data.name],
        ["Company", data.company],
        ["Phone", data.phone],
        ["Email", data.email],
        ["City", data.city],
        ["Service", data.service],
        ["Workforce need", data.workforce],
        ["Message", data.message],
      ]),
    ),
  });
}

export async function sendApplicationMail(data: {
  name: string;
  phone: string;
  email: string;
  role: string;
  message: string;
  resumeName: string;
  resume: Buffer;
}) {
  await send({
    subject: `Career application — ${data.name} (${data.role})`,
    replyTo: data.email || undefined,
    html: wrap(
      "New career application",
      rows([
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Role", data.role],
        ["Message", data.message],
        ["Resume", data.resumeName],
      ]),
    ),
    attachments: [{ filename: data.resumeName, content: data.resume }],
  });
}
