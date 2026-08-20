import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/site/ui";
import { locations, services } from "@/data/site";

export function generateStaticParams() {
  return locations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((x) => x.slug === slug);
  if (!loc) return {};
  return { title: loc.h1, description: loc.intro, alternates: { canonical: loc.href } };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locations.find((x) => x.slug === slug);
  if (!loc) notFound();

  return (
    <>
      <PageHero eyebrow="Locations" title={loc.h1} intro={loc.intro} />
      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl">Service areas</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We mention these localities because they sit within the Mumbai Metropolitan Region we
            serve — not as a keyword list.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {loc.areas.map((a) => (
              <li key={a} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                {a}
              </li>
            ))}
          </ul>
          <h2 className="mt-12 text-2xl">Services available</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s.slug}>{s.title}</li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
