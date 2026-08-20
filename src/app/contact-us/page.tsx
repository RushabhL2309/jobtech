"use client";

import { useState } from "react";
import { Container, PageHero } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { company, services } from "@/data/site";
import { photos } from "@/data/visuals";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <>
      <PageHero
        image={photos.officeMeeting}
        eyebrow="Contact Us"
        title="Contact Jobtech"
        intro="Request a consultation for manpower, payroll, HR outsourcing or labour compliance. For job applications, please use the Careers page."
      />
      <section className="py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
          <div>
            <h2 className="text-2xl">Mumbai Office</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{company.address}</p>
            <p className="mt-4 text-sm text-muted-foreground">Phone: {company.phone}</p>
            <p className="mt-1 text-sm text-muted-foreground">Email: {company.email}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Applying for a vacancy?{" "}
              <a href="/careers#apply" className="font-semibold text-slate-900 underline">
                Go to Careers
              </a>{" "}
              to submit your resume.
            </p>
          </div>
          </Reveal>
          <Reveal delay={80}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              setError("");
              setBusy(true);
              const fd = new FormData(form);
              const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: fd.get("name"),
                  company: fd.get("company"),
                  phone: fd.get("phone"),
                  email: fd.get("email"),
                  city: fd.get("city"),
                  service: fd.get("service"),
                  workforce: fd.get("workforce"),
                  message: fd.get("message"),
                }),
              });
              setBusy(false);
              if (!res.ok) {
                setError("Could not send. Please try again.");
                return;
              }
              setSent(true);
              form.reset();
            }}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-8"
          >
            <h2 className="text-2xl">Request a Service Consultation</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" />
              <Field label="Company name" name="company" required={false} />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <Field label="City" name="city" />
              <label className="block text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Service required
                </span>
                <select
                  name="service"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
                >
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Approximate workforce requirement
              </span>
              <input
                name="workforce"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="mt-4 block text-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </label>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={busy || sent}
              className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {sent ? "Thank you — we will be in touch" : busy ? "Submitting…" : "Submit consultation request"}
            </button>
          </form>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}
