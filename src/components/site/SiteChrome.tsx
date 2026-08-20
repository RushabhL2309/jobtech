"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) {
    return <main className="min-h-screen bg-slate-100">{children}</main>;
  }
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
