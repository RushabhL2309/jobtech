import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/site";
import { Container, SectionHeading } from "@/components/site/ui";

export function StickyServices() {
  return (
    <section className="bg-white">
      <Container className="lg:flex lg:items-start lg:gap-16">
        <div className="py-10 lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-7rem)] lg:w-[min(22rem,38%)] lg:shrink-0 lg:flex-col lg:justify-center lg:py-0">
          <SectionHeading eyebrow="Services" title="What we do" />
          <Link
            href="/services"
            className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 pb-16 pt-2 lg:gap-5 lg:py-28 lg:pb-40">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group relative flex min-h-[6.5rem] items-center justify-between gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef2f6] px-4 py-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift sm:min-h-[8rem] sm:gap-6 sm:px-5 sm:py-6 lg:min-h-[10.5rem] lg:px-8"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0b1f3a] via-slate-800 to-cyan-800 opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="relative flex min-w-0 items-center gap-3 sm:gap-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0b1f3a] text-[0.65rem] font-bold tracking-[0.12em] text-white shadow-soft transition duration-300 group-hover:!bg-white group-hover:!text-[#0b1f3a] sm:h-12 sm:w-12 sm:text-xs">
                  {s.number}
                </span>
                <span className="text-base font-semibold leading-snug text-ink transition duration-300 group-hover:text-white sm:text-lg lg:text-xl">
                  {s.title}
                </span>
              </span>
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-slate-500 transition duration-300 group-hover:text-[#0b1f3a] sm:h-10 sm:w-10">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
