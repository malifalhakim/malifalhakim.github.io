"use client"

import { Button } from "@/components/ui/button";
import { FileText, Code, ChevronUp, ChevronDown} from "lucide-react";
import { formatYear } from "@/lib/projects";
import type { Publication } from "@/types/profile";
import { useState } from "react";

const INITIAL_COUNT = 5;

export function PublicationsList({ publications }: {publications: Publication[]}){
    const [showAll, setShowAll] = useState(false);

    const visible = showAll? publications : publications.slice(0, INITIAL_COUNT);
    const hasMore = publications.length > INITIAL_COUNT;

    return (
        <div className="space-y-4">
            {visible.map((pub) => {
            const year = formatYear(pub.published_date);
            const venueLabel = [pub.published_in, year].filter(Boolean).join(" • ");

            return (
                <div
                key={pub.publication_id}
                className="group p-6 border border-border rounded-xl hover:bg-muted transition-all duration-200"
                >
                <div className="flex items-start justify-between gap-6">
                    {/* ── Left: text content ── */}
                    <div className="space-y-1.5 min-w-0">

                    {/* Venue + year */}
                    {venueLabel && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {venueLabel}
                        </p>
                    )}

                    {/* Title — underlines on row hover */}
                    <h3 className="text-base font-bold leading-snug decoration-1">
                        {pub.title}
                    </h3>

                    {/* Authors */}
                    {pub.authors && (
                        <p className="text-xs text-muted-foreground">
                        {pub.authors}
                        </p>
                    )}

                    {/* Description */}
                    {pub.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                        {pub.description}
                        </p>
                    )}

                    </div>

                    {/* ── Right: icon buttons ── */}
                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    {pub.paper_url && (
                        <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                        >
                        <a
                            href={pub.paper_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Read paper"
                        >
                            <FileText size={18} />
                        </a>
                        </Button>
                    )}
                    {pub.repo_url && (
                        <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                        >
                        <a
                            href={pub.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View repository"
                        >
                            <Code size={18} />
                        </a>
                        </Button>
                    )}
                    </div>
                </div>
                </div>
                
            );
            })}
            {/* Show more / less button */}
            {hasMore && (
                <div className="flex justify-center pt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground gap-2"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        {showAll ? (
                        <><ChevronUp size={14} /> Show less</>
                        ) : (
                        <><ChevronDown size={14} /> Show all {publications.length} publications</>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}

