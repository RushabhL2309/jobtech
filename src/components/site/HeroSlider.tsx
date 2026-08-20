"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { company } from "@/data/site";
import { photos } from "@/data/visuals";

const slides = [
  {
    image: photos.meeting,
    overlay: "from-slate-950/88 via-slate-900/55 to-slate-950/20",
    eyebrow: `Established ${company.established} · Mumbai`,
    title: "Manpower, Payroll & Labour Compliance Solutions for Businesses in Mumbai",
    body: "Staffing, payroll, HR outsourcing and labour-law support.",
    cta: { href: "/contact-us", label: "Request a Consultation" },
    secondary: { href: "/services", label: "Explore services" },
  },
  {
    image: photos.hospitalityStaff,
    overlay: "from-teal-950/86 via-slate-900/50 to-transparent",
    eyebrow: "Workforce · MMR coverage",
    title: "Structured manpower for corporate, logistics and industrial operations",
    body: "Skilled, semi-skilled and support staff deployed with documentation and on-ground coordination.",
    cta: { href: "/services/manpower-staffing", label: "Manpower staffing" },
    secondary: { href: "/industries", label: "Sectors we serve" },
  },
  {
    image: photos.interview,
    overlay: "from-zinc-950/88 via-blue-950/50 to-transparent",
    eyebrow: "Payroll · Statutory compliance",
    title: "Payroll administration and labour-law support, scoped to each establishment",
    body: "EPF, ESIC, professional tax and related filings as applicable — with a dedicated client team.",
    cta: { href: "/services/labour-law-compliance", label: "View compliance" },
    secondary: { href: "/contact-us", label: "Talk to our team" },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = slides.length - 1;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i === last ? 0 : i + 1));
    }, 6500);
    return () => window.clearInterval(id);
  }, [last, paused]);

  return (
    <section
      className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
          <div className="relative mx-auto flex h-[100svh] min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-28 pb-24 lg:px-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
              {slide.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.12] text-white sm:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/75">{slide.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={slide.cta.href}
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                {slide.cta.label}
              </Link>
              <Link
                href={slide.secondary.href}
                className="inline-flex rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {slide.secondary.label}
              </Link>
            </div>
            <div className="mt-16 grid max-w-lg grid-cols-2 gap-y-8 border-t border-white/20 pt-8 sm:grid-cols-4">
              {[
                { n: company.established, l: "Since" },
                { n: "Mumbai", l: "Based" },
                { n: "6", l: "Services" },
                { n: "MMR", l: "Coverage" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-lg font-semibold text-white">{s.n}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-white/50">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        aria-label="Previous banner"
        onClick={() => setIndex((i) => (i === 0 ? last : i - 1))}
        className="absolute top-1/2 left-4 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-slate-950/40 text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next banner"
        onClick={() => setIndex((i) => (i === last ? 0 : i + 1))}
        className="absolute top-1/2 right-4 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-slate-950/40 text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.eyebrow}
            type="button"
            aria-label={`Show banner ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-cyan-300" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
