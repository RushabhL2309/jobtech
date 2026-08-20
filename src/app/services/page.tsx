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
              <Link
                key={s.slug}
                href={s.href}
                className={`group overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${vis.tint} shadow-soft transition hover:-translate-y-1 hover:shadow-lift`}
              >
                <div className="relative h-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={vis.photo} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
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
            );
          })}
        </Container>
      </section>
      <CtaBand
        title="Need manpower, payroll or compliance support?"
        intro="Share your requirement. We will propose a service mix."
      />
    </>
  );
}
