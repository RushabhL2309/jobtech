"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Briefcase, ChevronLeft, ChevronRight, MapPin, Wallet } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/ui";
import type { Job } from "@/lib/types";

const PAGE_LG = 4;
const PAGE_SM = 2;
const PAGE_XS = 1;

function usePageSize() {
  const [size, setSize] = useState(PAGE_XS);
  useEffect(() => {
    const apply = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setSize(PAGE_LG);
      else if (window.matchMedia("(min-width: 640px)").matches) setSize(PAGE_SM);
      else setSize(PAGE_XS);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
  return size;
}

function JobCard({ job }: { job: Job }) {
  const href = `/careers?role=${encodeURIComponent(job.title)}#apply`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-violet-100 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift sm:p-6"
    >
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-brand uppercase">
        {job.industry}
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{job.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
      <ul className="mt-5 space-y-2 text-sm text-ink/80">
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand" />
          {job.location}
        </li>
        <li className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-brand" />
          {job.type}
        </li>
        <li className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-brand" />
          {job.pay}
        </li>
      </ul>
      <span className="mt-6 inline-flex w-fit rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold tracking-wide text-white uppercase transition group-hover:bg-cyan-700">
        Apply
      </span>
    </Link>
  );
}

export function JobSlider({ jobs, heading = true }: { jobs: Job[]; heading?: boolean }) {
  const perPage = usePageSize();
  const pages = useMemo(() => {
    const chunks: Job[][] = [];
    for (let i = 0; i < jobs.length; i += perPage) {
      chunks.push(jobs.slice(i, i + perPage));
    }
    return chunks;
  }, [jobs, perPage]);

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = Math.max(pages.length - 1, 0);

  useEffect(() => {
    setPage(0);
  }, [perPage]);

  useEffect(() => {
    if (pages.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setPage((p) => (p === last ? 0 : p + 1));
    }, 5000);
    return () => window.clearInterval(id);
  }, [last, pages.length, paused]);

  if (!jobs.length) return null;

  return (
    <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.35),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(6,182,212,0.18),transparent_40%)]" />
      <Container className="relative">
        {heading ? (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <SectionHeading light eyebrow="Careers" title="Current openings" />
            <Link href="/careers" className="text-sm font-semibold text-cyan-300 sm:block">
              All roles →
            </Link>
          </div>
        ) : null}

        <div
          className={heading ? "mt-12" : ""}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((group, i) => (
                <div
                  key={i}
                  className="grid w-full min-w-full shrink-0 basis-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
                >
                  {group.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {pages.length > 1 ? (
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-white/60">
                {page + 1} / {pages.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous openings"
                  onClick={() => setPage((p) => (p === 0 ? last : p - 1))}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-amber-300 hover:text-ink"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next openings"
                  onClick={() => setPage((p) => (p === last ? 0 : p + 1))}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-amber-300 hover:text-ink"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function JobCardGrid({ jobs }: { jobs: Job[] }) {
  if (!jobs.length) {
    return <p className="text-sm text-white/70">No openings listed right now. Check back soon.</p>;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
