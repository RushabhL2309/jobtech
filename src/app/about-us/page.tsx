import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/site/ui";
import { company, services, whyPoints } from "@/data/site";
import { photos } from "@/data/visuals";

export const metadata: Metadata = {
  title: "About Jobtech Hospitality & Management Services",
  description:
    "Established in 1989. Mumbai-based manpower, payroll, HR outsourcing and labour compliance — why organisations work with Jobtech.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={photos.officeMeeting}
        eyebrow="About Us"
        title="About Jobtech Hospitality & Management Services"
      />
      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-3xl">Experience built over decades</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {company.legalName} is a Mumbai-based workforce and HR services company established in{" "}
            {company.established}. From our office in Govandi we support organisations across Mumbai, Navi
            Mumbai, Thane and Panvel with the people, payroll and statutory work that keeps operations
            running.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We are not a facilities catalogue. We recruit and deploy manpower, run payroll cycles,
            administer HR on the client's behalf, and keep labour-law records, returns and audits in
            order — scoped to each establishment, not a generic package.
          </p>
        </Container>
      </section>
      <section className="bg-white pb-16 lg:pb-20">
        <Container>
          <h2 className="text-3xl">What we actually do</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Six service lines, used together or on their own, depending on what the client needs.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <article key={s.slug} className="rounded-2xl border border-slate-200 bg-[#f8f7fb] p-6">
                <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                  {s.number}
                </p>
                <h3 className="mt-2 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                <Link href={s.href} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline">
                  Service details
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#f4f2f7] py-16 lg:py-20">
        <Container>
          <h2 className="text-3xl">Why organisations work with us</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Integrated workforce, payroll and compliance support — scoped to each client, not a generic
            catalogue.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((p) => (
              <article key={p.number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <p className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b1f3a] text-xs font-semibold tracking-[0.18em] text-white">
                  {p.number}
                </p>
                <h3 className="mt-3 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-3xl">Our approach</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { t: "People", b: "Recruiting, documenting and deploying dependable workforce against the client's role profile." },
              { t: "Process", b: "Attendance, payroll, payslips, settlements and employee queries on a defined calendar." },
              { t: "Compliance", b: "Registrations, contributions, returns, registers and audits as they apply to the establishment." },
            ].map((p) => (
              <article
                key={p.t}
                className="rounded-2xl bg-gradient-to-br from-[#0b1f3a] to-slate-700 p-7 text-white shadow-lift"
              >
                <h3 className="text-xl text-white">{p.t}</h3>
                <p className="mt-3 text-sm text-white/85">{p.b}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
