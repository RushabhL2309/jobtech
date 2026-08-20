"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Application, Enquiry, Job } from "@/lib/types";

type Tab = "jobs" | "enquiries" | "applications";

export default function DashboardClient({
  jobs,
  enquiries,
  applications,
}: {
  jobs: Job[];
  enquiries: Enquiry[];
  applications: Application[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("jobs");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    location: "Mumbai",
    type: "Full-time",
    industry: "",
    pay: "As per experience",
    summary: "",
  });

  async function addJob(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    setForm({
      title: "",
      location: "Mumbai",
      type: "Full-time",
      industry: "",
      pay: "As per experience",
      summary: "",
    });
    router.refresh();
  }

  async function removeJob(id: string) {
    await fetch(`/api/jobs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    router.refresh();
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/dashboard/login");
    router.refresh();
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "jobs", label: "Jobs", count: jobs.length },
    { id: "enquiries", label: "Service enquiries", count: enquiries.length },
    { id: "applications", label: "Career applications", count: applications.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Jobtech</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Dashboard</h1>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === t.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {tab === "jobs" ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]">
          <form onSubmit={addJob} className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Add a job</h2>
            {[
              ["title", "Job title"],
              ["location", "Location"],
              ["type", "Type"],
              ["industry", "Industry"],
              ["pay", "Pay"],
            ].map(([key, label]) => (
              <label key={key} className="mt-4 block text-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
                <input
                  required={key === "title"}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-800"
                />
              </label>
            ))}
            <label className="mt-4 block text-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Summary</span>
              <textarea
                rows={3}
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-800"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {busy ? "Saving…" : "Publish job"}
            </button>
          </form>
          <div className="space-y-3">
            {jobs.map((job) => (
              <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{job.industry}</p>
                    <h3 className="mt-1 font-semibold text-slate-900">{job.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {job.location} · {job.type} · {job.pay}
                    </p>
                    {job.summary ? <p className="mt-2 text-sm text-slate-600">{job.summary}</p> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeJob(job.id)}
                    className="shrink-0 text-xs font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {tab === "enquiries" ? (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["When", "Name", "Company", "Phone", "Service", "Message"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No service enquiries yet.
                  </td>
                </tr>
              ) : (
                enquiries.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                      {new Date(row.createdAt).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-slate-500">{row.email}</p>
                    </td>
                    <td className="px-4 py-3">{row.company || "—"}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3">
                      {row.service}
                      {row.workforce ? <p className="text-xs text-slate-500">{row.workforce}</p> : null}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{row.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {tab === "applications" ? (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["When", "Name", "Role", "Contact", "Message", "Resume"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No career applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                      {new Date(row.createdAt).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">{row.role}</td>
                    <td className="px-4 py-3">
                      <p>{row.phone}</p>
                      <p className="text-xs text-slate-500">{row.email}</p>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{row.message || "—"}</td>
                    <td className="px-4 py-3">
                      <a
                        href={row.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-cyan-700 underline"
                      >
                        {row.resumeName || "View CV"}
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
