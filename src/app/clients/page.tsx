import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/ui";
import { clients, footerLocations } from "@/data/site";
import { photos } from "@/data/visuals";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Our Clients & Industry Experience",
  description:
    "Jobtech has supported organisations across corporate, logistics, shipping, manufacturing, education, government and other sectors.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        image={photos.officePeople}
        eyebrow="Our Clients"
        title="Our Clients & Industry Experience"
        intro="Over the years, Jobtech has supported organizations operating across corporate, logistics, shipping, manufacturing, education, government and other sectors. Client names are listed from our company profile. Logo artwork will be added only where we have permission to use each brand."
      />
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((c, i) => (
              <Reveal key={c} delay={(i % 8) * 40}>
              <div
                className="grid min-h-24 place-items-center rounded-xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 px-4 text-center text-sm font-semibold text-brand shadow-soft"
              >
                {c}
              </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
          <h2 className="mt-16 text-2xl">Selected client locations</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Mumbai", "Navi Mumbai", "Panvel", "Chembur", "Vikhroli", "Bandra", "Andheri"].map(
              (l) => (
                <li key={l} className="rounded-full border border-border px-4 py-2 text-sm">
                  {l}
                </li>
              ),
            )}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Service-area pages:{" "}
            {footerLocations.slice(0, 4).map((l, i) => (
              <span key={l.label}>
                {i ? " · " : ""}
                <a className="text-brand" href={l.href}>
                  {l.label}
                </a>
              </span>
            ))}
          </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
