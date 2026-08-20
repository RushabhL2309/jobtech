import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Jobtech",
  description:
    "Request a manpower, payroll or labour compliance consultation. Mumbai office: Govandi. Serving Mumbai, Navi Mumbai, Thane and Panvel.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
