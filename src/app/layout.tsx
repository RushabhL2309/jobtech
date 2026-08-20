import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteChrome } from "@/components/site/SiteChrome";
import { company } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
