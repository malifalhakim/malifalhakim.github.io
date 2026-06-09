import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import {
  sortExperiences,
  formatMonthYear,
  TYPE_LABEL,
  TYPE_BADGE_CLASS,
} from "@/lib/experiences";
import type { Experience } from "@/types/profile";

type Props = {
  experiences: Experience[];
};

export function ExperiencesSection({ experiences }: Props) {
  const sorted = sortExperiences(experiences);

  return (
    <section id="experience" className="max-w-[1200px] mx-auto px-6 md:px-12 py-0 space-y-12">

      {/* ── Section header ── */}
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Experience
        </h2>
        {/* White accent underline */}
        <div className="h-px w-16 bg-primary" />
      </div>

      {/* ── Experience cards ── */}
      <div className="space-y-4">
        {sorted.map((exp) => {
          const startLabel = formatMonthYear(exp.start_date, "—");
          const endLabel   = formatMonthYear(exp.end_date, "Present");
          const badgeClass = TYPE_BADGE_CLASS[exp.experience_type ?? "other"];
          const typeLabel  = TYPE_LABEL[exp.experience_type ?? "other"];

          return (
            <Card
              key={exp.experience_name}
              className="transition-colors hover:ring-foreground/20"
            >
              <CardHeader>
                {/* Left: optional logo + name + location */}
                <div className="flex items-start gap-4">
                  {exp.picture_url && (
                    <div className="relative size-10 shrink-0 rounded-md overflow-hidden border border-border bg-muted mt-0.5">
                      <Image
                        src={exp.picture_url}
                        alt={`${exp.experience_name} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold text-foreground truncate">
                      {exp.experience_name}
                    </CardTitle>
                    <CardDescription className="mt-0.5">
                      {exp.location}
                    </CardDescription>
                  </div>
                </div>

                {/* Right: date range + type badge */}
                <CardAction>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {startLabel} — {endLabel}
                    </span>
                  </div>
                </CardAction>
              </CardHeader>

              {/* Description — only if present */}
              {exp.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}