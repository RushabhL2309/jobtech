"use client";

import { complianceItems } from "@/data/site";
import ComplianceCard from "@/components/site/ComplianceCard";

export default function CompliancePreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {complianceItems.slice(0, 8).map((item, i) => (
        <ComplianceCard
          key={item.slug}
          item={item}
          index={i}
          href={`/services/labour-law-compliance#${item.slug}`}
        />
      ))}
    </div>
  );
}
