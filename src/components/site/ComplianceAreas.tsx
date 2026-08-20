"use client";

import { useEffect, useState } from "react";
import { complianceItems } from "@/data/site";
import ComplianceCard from "@/components/site/ComplianceCard";

export default function ComplianceAreas() {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && complianceItems.some((c) => c.slug === hash)) {
        setOpen(hash);
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {complianceItems.map((item, i) => (
        <ComplianceCard
          key={item.slug}
          item={item}
          index={i}
          expanded={open === item.slug}
          onToggle={() => setOpen(open === item.slug ? null : item.slug)}
        />
      ))}
    </div>
  );
}
