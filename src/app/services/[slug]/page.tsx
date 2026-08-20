import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, Container, PageHero } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import ComplianceAreas from "@/components/site/ComplianceAreas";
import { services } from "@/data/site";
import { servicePages } from "@/data/pages";
import { serviceVisuals } from "@/data/visuals";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.h1, description: s.description, alternates: { canonical: s.href } };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  const content = servicePages[slug];
  if (!s || !content) notFound();

  return (
    <>
      <PageHero eyebrow="Services" title={s.h1} intro={s.summary} image={serviceVisuals[slug]?.photo} />
      {slug === "labour-law-compliance" ? (
        <section className="relative overflow-hidden bg-[#efeaf6] py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-violet-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
          <Container className="relative max-w-6xl">
            <Reveal>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {content.sections[0]?.body}
            </p>
            <ComplianceAreas />
            </Reveal>
          </Container>
        </section>
      ) : (
        <section className="py-16">
          <Container className="mx-auto grid max-w-3xl gap-6">
            {content.sections.map((sec, i) => (
              <Reveal key={sec.title} delay={i * 70}>
              <article
                className={`rounded-2xl border border-border p-6 shadow-soft ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-violet-50 to-white"
                    : "bg-gradient-to-br from-amber-50 to-white"
                }`}
              >
                <h2 className="text-2xl">{sec.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sec.body}</p>
              </article>
              </Reveal>
            ))}
            {content.faqs?.length ? (
              <Reveal>
              <div className="mt-12">
                <h2 className="text-2xl">FAQs</h2>
                <div className="mt-6 space-y-4">
                  {content.faqs.map((f) => (
                    <div key={f.q} className="rounded-xl border border-border bg-card p-5">
                      <h3 className="text-lg">{f.q}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              </Reveal>
            ) : null}
          </Container>
        </section>
      )}
      <Reveal>
      <CtaBand
        title={`Talk to us about ${s.title}`}
        intro={s.summary}
      />
      </Reveal>
    </>
  );
}
