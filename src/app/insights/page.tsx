import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/site/ui";
import { insights } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Insights & Resources",
  description:
    "Guides on labour compliance, manpower staffing and HR outsourcing for businesses in Mumbai, Navi Mumbai and Panvel.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Resources for employers"
        intro="Search-intent articles on labour compliance, manpower and Mumbai-region workforce topics — not generic HR slogans."
      />
      <section className="py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {insights.map((a, i) => (
            <Reveal key={a.slug} delay={i * 70}>
            <Link
              href={`/insights/${a.slug}`}
              className="rounded-2xl border border-border bg-card p-7 hover:border-brand"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {a.category}
              </p>
              <h2 className="mt-3 text-xl">{a.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{a.excerpt}</p>
            </Link>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
