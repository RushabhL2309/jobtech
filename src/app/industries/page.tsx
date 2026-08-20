import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/site/ui";
import { industries } from "@/data/site";
import { industryVisuals, photos } from "@/data/visuals";
import { CoverImage } from "@/components/site/CoverImage";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Jobtech workforce solutions for corporate, hospitality, logistics and shipping, manufacturing, education and government organisations.",
};

export default function IndustriesHubPage() {
  return (
    <>
      <PageHero
        image={photos.hospitalityStaff}
        eyebrow="Industries"
        title="Industries We Serve"
        intro="Workforce, payroll and compliance support across the sectors documented in our company profile."
      />
      <section className="py-16">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const vis = industryVisuals[ind.slug]!;
            return (
              <Reveal key={ind.slug} delay={i * 70}>
              <Link
                href={ind.href}
                className="group relative block h-64 overflow-hidden rounded-2xl shadow-lift"
              >
                <CoverImage
                  src={vis.photo}
                  alt={ind.title}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  quality={55}
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${vis.overlay}`} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className={`inline-block h-1.5 w-12 rounded-full ${vis.accent}`} />
                  <h2 className="mt-3 text-xl text-white">{ind.title}</h2>
                  <p className="mt-2 text-sm text-white/75">{ind.summary}</p>
                </div>
              </Link>
              </Reveal>
            );
          })}
        </Container>
      </section>
    </>
  );
}
