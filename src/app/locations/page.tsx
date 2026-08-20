import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/site/ui";
import { locations } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Locations — Mumbai, Navi Mumbai, Thane & Panvel",
  description:
    "Jobtech manpower, payroll and labour compliance services across Mumbai, Navi Mumbai, Thane and Panvel.",
};

export default function LocationsHub() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Where we serve"
        intro="Dedicated pages for the regions we actually work in — not a stuffed list of every suburb."
      />
      <section className="py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {locations.map((l, i) => (
            <Reveal key={l.slug} delay={i * 70}>
            <Link
              href={l.href}
              className="rounded-2xl border border-border bg-card p-7 hover:border-brand"
            >
              <h2 className="text-xl">{l.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{l.h1}</p>
            </Link>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
