import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  Handshake,
  Scale,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { CtaBand, Container, PageHero } from "@/components/site/ui";
import { CoverImage } from "@/components/site/CoverImage";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/data/site";
import { photos, serviceVisuals } from "@/data/visuals";

export const metadata: Metadata = {
  title: "Manpower, Payroll & HR Compliance Services in Mumbai",
  description:
    "Jobtech services: recruitment and manpower staffing, payroll management, labour law compliance, compliance audits, HR outsourcing and labour law consulting in Mumbai.",
};

const icons = [Users, Wallet, Scale, ClipboardCheck, Workflow, Handshake];

export default function ServicesHubPage() {
  return (
    <>
      <PageHero
        image={photos.meeting}
        eyebrow="Services"
        title="Manpower, Payroll & HR Compliance Services in Mumbai"
        intro="Each service has its own page so you can review staffing, payroll, compliance, audit, outsourcing and consulting in detail."
      />
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i]!;
            const vis = serviceVisuals[s.slug]!;
            return (
              <Reveal key={s.slug} delay={i * 70}>
              <Link
                href={s.href}
                className={`group overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${vis.tint} shadow-soft transition hover:-translate-y-1 hover:shadow-lift`}
              >
                <div className="relative h-36">
                  <CoverImage src={vis.photo} alt="" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" quality={55} className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-[#0b1f3a] text-xs font-bold tracking-[0.16em] text-white">
                    {s.number}
                  </span>
                </div>
                <div className="p-6">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${vis.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-xl">{s.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{s.summary}</p>
                </div>
              </Link>
              </Reveal>
            );
          })}
        </Container>
      </section>
      <Reveal>
      <CtaBand
        title="Need manpower, payroll or compliance support?"
        intro="Share your requirement. We will propose a service mix."
      />
      </Reveal>
    </>
  );
}
