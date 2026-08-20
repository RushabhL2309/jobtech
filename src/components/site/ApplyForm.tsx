"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Job } from "@/lib/types";

export default function ApplyForm({ jobs }: { jobs: Job[] }) {
  const params = useSearchParams();
  const preset = params.get("role") ?? "";
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      id="apply"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setBusy(true);
        const form = e.currentTarget;
        const res = await fetch("/api/applications", {
          method: "POST",
          body: new FormData(form),
        });
        setBusy(false);
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          setError(data?.error || "Could not submit. Please try again.");
          return;
        }
        setSent(true);
        form.reset();
      }}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-8 shadow-soft"
    >
      <h2 className="text-2xl text-ink">Apply for a role</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Job applications are handled here. For manpower or compliance services, use Contact Us.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Email" name="email" type="email" />
        <label className="block text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Role
          </span>
          <select
            defaultValue={preset}
            name="role"
            required
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-slate-800"
          >
            <option value="">Select a role</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>
                {job.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-slate-800"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Upload resume
        </span>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        <span className="mt-1 block text-xs text-muted-foreground">PDF or Word, up to 5 MB.</span>
      </label>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={busy || sent}
        className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {sent ? "Thank you — we will review your application" : busy ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-slate-800"
      />
    </label>
  );
}
