import Link from "next/link";
import { industries } from "@/data/site";
import { industryVisuals } from "@/data/visuals";

const hoverFills = [
  "from-[#4b2c84]/95 via-violet-700/90 to-blue-900/90",
  "from-indigo-900/95 via-brand/90 to-sky-900/90",
  "from-violet-900/95 via-purple-800/90 to-blue-800/90",
  "from-[#2a1658]/95 via-brand/90 to-teal-900/85",
  "from-blue-950/95 via-violet-800/90 to-indigo-900/90",
  "from-violet-950/95 via-fuchsia-900/80 to-sky-900/90",
];

function SectorCard({
  industry,
  fill,
}: {
  industry: (typeof industries)[number];
  fill: string;
}) {
  const vis = industryVisuals[industry.slug];

  return (
    <Link
      href={industry.href}
      className="group relative h-64 w-60 shrink-0 overflow-hidden rounded-2xl shadow-soft sm:h-80 sm:w-72"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={vis?.photo}
        alt={industry.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition duration-500 group-hover:opacity-0" />
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100 ${fill}`}
      />

      <div className="absolute inset-x-0 bottom-0 p-6 transition duration-500 group-hover:translate-y-2 group-hover:opacity-0">
        <h3 className="text-lg font-semibold text-white">{industry.title}</h3>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-7 py-8 text-center opacity-0 transition duration-500 group-hover:opacity-100">
        <h3 className="text-lg font-semibold text-white">{industry.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{industry.summary}</p>
        <span className="mt-6 inline-flex rounded-full border border-white px-5 py-2 text-xs font-semibold tracking-wide text-white uppercase">
          Read more
        </span>
      </div>
    </Link>
  );
}

export function SectorMarquee() {
  const loop = [...industries, ...industries];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink to-transparent sm:w-16" />
      <div className="group/mq overflow-hidden py-1">
        <div className="animate-marquee flex w-max gap-5 group-hover/mq:[animation-play-state:paused]">
          {loop.map((industry, i) => (
            <SectorCard
              key={`${industry.slug}-${i}`}
              industry={industry}
              fill={hoverFills[industries.findIndex((x) => x.slug === industry.slug) % hoverFills.length]!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
