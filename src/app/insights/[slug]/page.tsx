import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/site/ui";
import { insights } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";

export function generateStaticParams() {
  return insights.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt };
}

export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  if (!a) notFound();

  return (
    <>
      <PageHero eyebrow={a.category} title={a.title} intro={a.excerpt} />
      <section className="py-16">
        <Container className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <Reveal>
          <p>
            This article is written for employers evaluating {a.category.toLowerCase()} in the
            Mumbai region. Jobtech can support related processes through manpower staffing, payroll
            management and labour compliance services where they apply to your establishment.
          </p>
          <p>
            Requirements vary by industry, headcount and whether the workplace is a shop,
            commercial establishment, factory or contract-labour site. Use this as an orientation —
            not as legal advice for every organisation.
          </p>
          <p>
            For a structured discussion of your workforce or compliance calendar, request a
            consultation and we will scope the work against the statutes that actually apply.
          </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
