import { clients } from "@/data/site";

function MarqueeRow({
  items,
  shiftClass = "",
  durationClass = "animate-marquee",
}: {
  items: string[];
  shiftClass?: string;
  durationClass?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className="group/mq overflow-hidden">
      <div
        className={`flex w-max gap-4 ${durationClass} ${shiftClass} group-hover/mq:[animation-play-state:paused]`}
      >
        {loop.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="grid min-h-24 min-w-48 place-items-center rounded-2xl border border-violet-100 bg-white px-5 text-center text-sm font-semibold text-brand shadow-soft sm:min-h-36 sm:min-w-72 sm:rounded-3xl sm:px-10 sm:text-lg"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  const rowTwo = [...clients.slice(3), ...clients.slice(0, 3)];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f4f2f7] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f4f2f7] to-transparent sm:w-20" />
      <div className="space-y-6">
        <MarqueeRow items={clients} />
        <MarqueeRow items={rowTwo} shiftClass="-ml-32 sm:-ml-40" />
      </div>
    </div>
  );
}
