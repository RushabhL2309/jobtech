"use client";

import Link from "next/link";
import { ClipboardCheck, FileText, Scale, ShieldCheck } from "lucide-react";
import { complianceItems } from "@/data/site";

const icons = [Scale, ShieldCheck, FileText, ClipboardCheck];
const accents = [
  { tile: "bg-violet-600", wash: "from-violet-50 via-white to-white", ring: "ring-violet-200" },
  { tile: "bg-indigo-600", wash: "from-indigo-50 via-white to-white", ring: "ring-indigo-200" },
  { tile: "bg-sky-600", wash: "from-sky-50 via-white to-white", ring: "ring-sky-200" },
  { tile: "bg-fuchsia-600", wash: "from-fuchsia-50 via-white to-white", ring: "ring-fuchsia-200" },
];

export default function ComplianceCard({
  item,
  index,
  href,
  expanded,
  onToggle,
}: {
  item: (typeof complianceItems)[number];
  index: number;
  href?: string;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const Icon = icons[index % icons.length]!;
  const accent = accents[index % accents.length]!;

  const inner = (
    <>
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-soft ${accent.tile}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-snug text-ink">{item.title}</span>
        <span className="mt-1.5 block text-xs font-semibold tracking-wide text-brand uppercase">
          {expanded ? "Hide details" : "View details"}
        </span>
      </span>
    </>
  );

  return (
    <article
      id={item.slug}
      className={`group scroll-mt-28 overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br p-6 shadow-soft ring-1 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift ${accent.wash} ${
        expanded ? `${accent.ring} ring-2` : "ring-transparent"
      }`}
    >
      {href ? (
        <Link href={href} className="flex items-start gap-4">
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onToggle} className="flex w-full items-start gap-4 text-left">
          {inner}
        </button>
      )}
      {expanded ? (
        <p className="mt-4 border-t border-black/5 pt-4 text-sm leading-relaxed text-muted-foreground">
          {item.detail}
        </p>
      ) : null}
    </article>
  );
}
