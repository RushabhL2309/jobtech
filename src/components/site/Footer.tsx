import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, footerLocations, industries, services } from "@/data/site";

const companyLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/clients", label: "Our Clients" },
  { href: "/careers", label: "Careers" },
  { href: "/contact-us", label: "Contact Us" },
];

const serviceLabels: Record<string, string> = {
  "manpower-staffing": "Manpower Staffing",
  "payroll-management": "Payroll",
  "labour-law-compliance": "Labour Compliance",
  "compliance-audit": "Labour Compliance Audit",
  "hr-outsourcing": "HR Outsourcing",
  "labour-law-consulting": "Labour Consulting",
};

const industryLabels: Record<string, string> = {
  corporate: "Corporate",
  hospitality: "Hospitality",
  "logistics-shipping": "Logistics & Shipping",
  manufacturing: "Manufacturing",
  education: "Education",
  government: "Government",
};

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative h-12 w-40 rounded-md bg-white px-2">
              <Image src="/logo/jobtech-logo.png" alt="Jobtech" fill className="object-contain" />
            </div>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/70">
              Workforce, payroll and labour-compliance support for organisations across Mumbai and
              the MMR. Established {company.established}.
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="hover:text-white">
                    {serviceLabels[s.slug] ?? s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">Industries</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {industries.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="hover:text-white">
                    {industryLabels[s.slug] ?? s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-cyan-300" />
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cyan-300" />
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-8 sm:grid-cols-2">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">Company</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">Locations</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              {footerLocations.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p>Workforce management · Payroll · Labour compliance</p>
        </div>
      </div>
    </footer>
  );
}
