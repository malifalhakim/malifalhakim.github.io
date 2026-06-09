"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { LayoutGrid } from "lucide-react";
import { ProjectCard } from "@/components/ProjectsCard";
import type { Project } from "@/types/profile";

const INITIAL_COUNT = 6;

type Props = {
    projects: Project[];
}

export function ProjectsGrid({ projects }: Props) {
    const [open, setOpen] = useState(false)
    const [pressing, setPressing] = useState(false)

    const initial = projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT;

    function handleOpen() {
        setPressing(true);
        setTimeout(() => {
            setPressing(false);
            setOpen(true);
        }, 150);
    }

    return (
    <>
      {/* ── Initial 6-card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initial.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>

      {/* ── "View all" button ── */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2 text-muted-foreground hover:text-foreground",
              "transition-all duration-150 active:scale-95",
              pressing && "scale-95 opacity-60"
            )}
            onClick={handleOpen}
          >
            <LayoutGrid size={14} />
            View all {projects.length} projects
          </Button>
        </div>
      )}

      {/* ── Modal with full project archive ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[1200px] w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">All Projects</DialogTitle>
            <DialogDescription>
              {projects.length} projects
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {projects.map((project, index) => (
              <div
                key={project.project_id}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}