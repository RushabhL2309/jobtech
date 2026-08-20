import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/site/ui";
import { industries } from "@/data/site";
import { industryPages } from "@/data/pages";
import { industryVisuals } from "@/data/visuals";

export function generateStaticParams() {
  return industries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = industries.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.h1,
    description: s.summary,
    alternates: { canonical: s.href },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = industries.find((x) => x.slug === slug);
  const body = industryPages[slug];
  if (!s || !body) notFound();

  return (
    <>
      <PageHero eyebrow="Industries" title={s.h1} image={industryVisuals[slug]?.photo} />
      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-2xl">How we support this sector</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Contact Us
          </Link>
        </Container>
      </section>
    </>
  );
}
