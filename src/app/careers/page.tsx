import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { Container, PageHero } from "@/components/site/ui";
import { JobCardGrid } from "@/components/site/JobSlider";
import ApplyForm from "@/components/site/ApplyForm";
import { photos } from "@/data/visuals";
import { getJobs } from "@/lib/store";

export const metadata: Metadata = {
  title: "Careers at Jobtech",
  description:
    "Current job listings for hospitality, corporate, logistics and compliance roles recruited and deployed by Jobtech in Mumbai and surrounding regions.",
};

export const revalidate = 60;

export default async function CareersPage() {
  let jobs: Awaited<ReturnType<typeof getJobs>> = [];
  try {
    jobs = await getJobs();
  } catch (err) {
    console.error("getJobs failed:", err);
  }
  return (
    <>
      <PageHero
        image={photos.interview}
        eyebrow="Careers"
        title="Work with Jobtech"
        intro="Browse current openings and apply with your resume. For manpower, payroll or compliance services, use Contact Us."
      />
      <section className="relative overflow-hidden bg-ink py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.45),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(6,182,212,0.18),transparent_40%)]" />
        <Container className="relative">
          <Reveal>
            <JobCardGrid jobs={jobs} />
          </Reveal>
        </Container>
      </section>
      <section className="bg-[#f4f2f7] py-16 lg:py-20">
        <Container className="max-w-3xl">
          <Reveal>
          <Suspense fallback={<div className="h-64 rounded-2xl bg-white" />}>
            <ApplyForm jobs={jobs} />
          </Suspense>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Looking for staffing or compliance support?{" "}
            <Link href="/contact-us" className="font-semibold text-slate-900 underline">
              Contact us for services
            </Link>
            .
          </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
