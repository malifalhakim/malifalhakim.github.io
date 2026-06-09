"use client"

import { useState } from "react"
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

    const initial = projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT;

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
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(true)}
          >
            <LayoutGrid size={14} />
            View all {projects.length} projects
          </Button>
        </div>
      )}
      {/* ── Modal with full project archive ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-full max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">All Projects</DialogTitle>
            <DialogDescription>
              {projects.length} projects
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {projects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}