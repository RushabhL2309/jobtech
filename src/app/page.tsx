import Link from "next/link";
import {
  Award,
  Building2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { SectorMarquee } from "@/components/site/SectorMarquee";
import { JobSlider } from "@/components/site/JobSlider";
import { StickyServices } from "@/components/site/StickyServices";
import HeroSlider from "@/components/site/HeroSlider";
import { Container, CtaBand, SectionHeading } from "@/components/site/ui";
import CompliancePreview from "@/components/site/CompliancePreview";
import { whyPoints } from "@/data/site";
import { getJobs } from "@/lib/store";

const whyIcons = [Award, Workflow, ShieldCheck, Handshake, Sparkles, Building2];

const whyCardFill = "from-[#2a1658] via-brand to-cyan-600";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jobs = await getJobs();
  return (
    <>
      <HeroSlider />

      <StickyServices />

      <section className="bg-[#f4f2f7] py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Why Jobtech"
            title="A clearer way to run workforce operations"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((p, i) => {
              const Icon = whyIcons[i]!;
              return (
                <Reveal key={p.number} delay={i * 50} className="h-full">
                  <article
                    className={`group h-full rounded-2xl bg-gradient-to-br p-6 text-white shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-lift ${whyCardFill}`}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.18em] text-amber-300">
                      {p.number}
                    </p>
                    <h3 className="mt-2 text-lg leading-snug text-white">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{p.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.25),transparent_40%)]" />
        <Container className="relative">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading
              light
              eyebrow="Sectors"
              title="Workforce solutions across diverse industries"
            />
            <Link href="/industries" className="hidden text-sm font-semibold text-cyan-300 sm:block">
              View all →
            </Link>
          </div>
        </Container>
        <div className="relative mt-2">
          <SectorMarquee />
        </div>
      </section>

      <section className="overflow-hidden bg-[#f4f2f7] py-24 lg:py-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Clients" title="Organisations we have supported" />
            <Link href="/clients" className="hidden text-sm font-semibold text-brand sm:block">
              View clients →
            </Link>
          </div>
        </Container>
        <div className="mt-12">
          <ClientMarquee />
        </div>
      </section>

      <section className="bg-white py-24 lg:py-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Compliance"
              title="Statutory areas we support"
              intro="Payroll, labour and establishment requirements — scoped to what applies to each client."
            />
            <Link
              href="/services/labour-law-compliance"
              className="hidden text-sm font-semibold text-brand sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-12">
            <CompliancePreview />
          </div>
        </Container>
      </section>

      <JobSlider jobs={jobs} />
      <CtaBand />
    </>
  );
}
