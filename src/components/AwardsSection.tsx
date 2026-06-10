// src/components/AwardsSection.tsx
import { Trophy, HandHeart } from "lucide-react";
import { mergeAndSort, KIND_BADGE } from "@/lib/awards";
import type { Award, Volunteering } from "@/types/profile";

type Props = {
  awards: Award[];
  volunteering: Volunteering[];
};

const KIND_ICON: Record<string, React.ReactNode> = {
  award:     <Trophy    size={22} className="text-primary" />,
  volunteer: <HandHeart size={22} className="text-primary" />,
};

export function AwardsSection({ awards, volunteering }: Props) {
  const items = mergeAndSort(awards, volunteering);

  return (
    <section
      id="awards"
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 space-y-12"
    >
      {/* ── Section header ── */}
      <div className="space-y-3 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Awards & Volunteer
        </h2>
        <div className="h-px w-16 bg-primary" />
      </div>

      {/* ── 3-column card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 s:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((item) => {
          const badge = KIND_BADGE[item.kind];

          return (
            <div
              key={item.key}
              className="relative p-6 border border-border bg-card rounded-xl space-y-4 hover:ring-1 hover:ring-foreground/20 transition-all duration-200"
            >
              {/* ── Kind badge — top-right corner ── */}
              <span
                className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badge.className}`}
              >
                {badge.label}
              </span>

              {/* Kind icon — always shown */}
              <div className="size-12 rounded-lg border border-border bg-muted flex items-center justify-center">
                {KIND_ICON[item.kind]}
              </div>

              {/* ── Text content ── */}
              <div className="space-y-1.5 pr-16">
                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {item.name}
                </h3>

                {item.subtitle && (
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </p>
                )}

                {item.dateLabel && (
                  <p className="text-xs text-muted-foreground">
                    {item.dateLabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}