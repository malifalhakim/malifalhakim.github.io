"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Microscope, Briefcase, BookSearch, Layers } from "lucide-react";
import {
    Card, CardContent, CardHeader,
    CardTitle, CardDescription, CardAction,
} from "@/components/ui/card"
import { formatMonthYear, TYPE_LABEL, TYPE_BADGE_CLASS } from "@/lib/experiences";
import type { Experience, ExperienceType } from "@/types/profile";

const INITIAL_COUNT = 5;

const TYPE_ICON: Record<string, React.ReactNode> = {
  research: <Microscope   size={18} />,
  work:     <Briefcase    size={18} />,
  course:   <BookSearch  size={18} />,
  other:    <Layers       size={18} />,
};

export function ExperiencesList({ experiences }: { experiences: Experience[] }) {
    const [showAll, setShowAll] = useState(false);
    const [isCollapsing, setIsCollapsing] = useState(false);

    const visible = showAll ? experiences : experiences.slice(0, INITIAL_COUNT);
    const hasMore = experiences.length > INITIAL_COUNT;

    function handleToggle() {
        if (showAll) {
            setIsCollapsing(true);
            setTimeout(() => {
                setShowAll(false);
                setIsCollapsing(false);
            }, 380);
        } else {
            setShowAll(true);
        }
    }

    return (
    <div className="space-y-4">
      {visible.map((exp, index) => {
        const startLabel = formatMonthYear(exp.start_date, "—");
        const endLabel   = formatMonthYear(exp.end_date, "Present");
        const badgeClass = TYPE_BADGE_CLASS[exp.experience_type ?? "other"];
        const typeLabel  = TYPE_LABEL[exp.experience_type ?? "other"];

        const isNew      = showAll && !isCollapsing && index >= INITIAL_COUNT;
        const isExiting  = isCollapsing && index >= INITIAL_COUNT;

        return (
          <div
            key={exp.experience_name}
            className={
              isExiting
                ? "animate-out fade-out-0 slide-out-to-bottom-4 duration-300 fill-mode-both"
                : isNew
                ? "animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both"
                : undefined
            }
            style={isNew
              ? { animationDelay: `${(index - INITIAL_COUNT) * 60}ms` }
              : undefined
            }
          >
            <Card className="transition-colors hover:ring-foreground/20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  {/* Type icon */}
                  <div className="size-10 shrink-0 rounded-md border border-border bg-muted flex items-center justify-center text-muted-foreground mt-0.5">
                    {TYPE_ICON[exp.experience_type ?? "other"] ?? <Layers size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold text-foreground">
                      {exp.experience_name}
                    </CardTitle>
                    <CardDescription className="mt-0.5">{exp.location}</CardDescription>
                  </div>
                </div>
                <CardAction>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {startLabel} — {endLabel}
                    </span>
                  </div>
                </CardAction>
              </CardHeader>
              {exp.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                </CardContent>
              )}
            </Card>
          </div>
        );
      })}

      {/* Show more / less button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-2 transition-all duration-200 active:scale-95"
            onClick={handleToggle}
          >
            {showAll ? (
              <><ChevronUp size={14} /> Show less</>
            ) : (
              <><ChevronDown size={14} /> Show all {experiences.length} experiences</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}