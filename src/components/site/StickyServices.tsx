import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/site";
import { Container, SectionHeading } from "@/components/site/ui";

export function StickyServices() {
  return (
    <section className="bg-white">
      <Container className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
        <div className="py-14 lg:sticky lg:top-24 lg:flex lg:h-[42vh] lg:flex-col lg:justify-center lg:self-start lg:py-0">
          <SectionHeading eyebrow="Services" title="What we do" />
          <Link
            href="/services"
            className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-4 py-14 pb-20 lg:py-16 lg:pb-[35vh]">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group relative flex min-h-[7.5rem] items-center justify-between gap-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef2f6] px-5 py-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift lg:min-h-[9.5rem] lg:px-6"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0b1f3a] via-slate-800 to-cyan-800 opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="relative flex min-w-0 items-center gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0b1f3a] text-xs font-bold tracking-[0.12em] text-white shadow-soft transition duration-300 group-hover:!bg-white group-hover:!text-[#0b1f3a]">
                  {s.number}
                </span>
                <span className="text-lg font-semibold text-ink transition duration-300 group-hover:text-white sm:text-xl">
                  {s.title}
                </span>
              </span>
              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-slate-500 transition duration-300 group-hover:text-[#0b1f3a]">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
