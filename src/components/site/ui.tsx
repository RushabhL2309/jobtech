import Link from "next/link";
import { type ReactNode } from "react";
import { jobs } from "@/data/site";
import { photos } from "@/data/visuals";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-xl text-center" : "max-w-xl"}>
      {eyebrow ? (
        <p className={`eyebrow ${light ? "text-cyan-200" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`mt-3 text-[1.55rem] leading-tight sm:text-[1.85rem] lg:text-[2.15rem] ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed ${light ? "text-white/75" : "text-muted-foreground"}`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image = photos.officePeople,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[42svh] items-end overflow-hidden pt-24 pb-10 sm:min-h-[52svh] sm:pt-28 sm:pb-16 lg:min-h-[58svh] lg:pt-32 lg:pb-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/62 to-slate-950/25" />
      <Container className="relative">
        {eyebrow ? (
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cyan-200 sm:text-[0.72rem]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-4xl text-[1.7rem] leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:text-lg">{intro}</p>
        ) : null}
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Need manpower or compliance support?",
  intro = "Share your requirement. We will propose a service mix.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-[#f4f2f7] pt-12 pb-24 sm:pt-16 sm:pb-28 lg:pt-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-8 text-white sm:px-12 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-16">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/15 blur-2xl" />
          <div className="absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-blue-800/30 blur-2xl" />
          <div className="relative max-w-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Get in touch
            </p>
            <h2 className="mt-3 text-xl text-white sm:text-2xl lg:text-3xl">{title}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{intro}</p>
          </div>
          <div className="relative mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap lg:mt-0 lg:shrink-0">
            <Link
              href="/contact-us"
              className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
            >
              Request a Consultation
            </Link>
            <a
              href="tel:+912225560000"
              className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Call Our Team
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function JobListings({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <Container>
        {heading ? (
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Careers" title="Current openings" />
            <Link href="/careers" className="hidden text-sm font-semibold text-brand sm:block">
              All roles →
            </Link>
          </div>
        ) : null}
        <div className={`divide-y divide-border border-y border-border ${heading ? "mt-12" : ""}`}>
          {jobs.map((job) => (
            <article
              key={job.title}
              className="grid grid-cols-1 items-center gap-3 py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
            >
              <div>
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.location} · {job.type} · {job.industry}
                </p>
              </div>
              <Link
                href="/contact-us"
                className="inline-flex w-fit text-sm font-semibold text-brand hover:underline"
              >
                Apply
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
