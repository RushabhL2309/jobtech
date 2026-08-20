import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { company } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobtech.in"),
  title: {
    default: "Manpower Staffing, Payroll & Labour Compliance Services in Mumbai | Jobtech",
    template: "%s | Jobtech",
  },
  description:
    "Jobtech provides manpower staffing, payroll management, HR outsourcing and labour compliance services for businesses in Mumbai, Navi Mumbai and surrounding areas.",
  authors: [{ name: company.legalName }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jobtech",
    title: "Manpower Staffing, Payroll & Labour Compliance Services in Mumbai | Jobtech",
    description:
      "Jobtech provides manpower staffing, payroll management, HR outsourcing and labour compliance services for businesses in Mumbai, Navi Mumbai and surrounding areas.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.legalName,
    url: "https://jobtech.in",
    telephone: company.phone,
    email: company.email,
    foundingDate: String(company.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-102, Grit Residency, Ghatkopar-Mankhurd Link Road, Govandi",
      addressLocality: "Mumbai",
      postalCode: "400043",
      addressCountry: "IN",
    },
    areaServed: ["Mumbai", "Navi Mumbai", "Thane", "Panvel"],
    description:
      "Manpower staffing, payroll management, HR outsourcing and labour-law compliance services.",
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
