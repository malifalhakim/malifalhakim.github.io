"use client"

import { getBrowserClient } from "@/lib/supabase/browser"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ExperiencesSection } from "@/components/ExperiencesSection"
import { ProjectsSection } from "@/components/ProjectsSection";
import type { Profile, Experience, Project, Publication, Education, Skill, Award, Volunteering } from "@/types/profile"
import { PublicationsSection } from "@/components/PublicationsSection";
import { EducationSkillsSection } from "@/components/EducationSkillsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react"

type PageData = {
  profile: Profile | null;
  experiences: Experience[];
  projects: Project[];
  publications: Publication[];
  education: Education[];
  skills: Skill[];
  awards: Award[];
  volunteering: Volunteering[];
}

const EMPTY: PageData = {
  profile: null,
  experiences: [],
  projects: [],
  publications: [],
  education: [],
  skills: [],
  awards: [],
  volunteering: [],
}

export default function Home() {
  const [data, setData]       = useState<PageData>(EMPTY)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      const supabase = getBrowserClient()

      const [
        profileResult,
        experiencesResult,
        projectsResult,
        publicationsResult,
        educationResult,
        skillsResult,
        awardsResult,
        volunteeringResult,
      ] = await Promise.all([
        supabase.from("profile").select("*").single<Profile>(),
        supabase.from("experiences").select("*").returns<Experience[]>(),
        supabase.from("projects").select("*").order("project_date", { ascending: false }).returns<Project[]>(),
        supabase.from("publications").select("*").order("published_date", {ascending:false}).returns<Publication[]>(),
        supabase.from("education").select("*").returns<Education[]>(),
        supabase.from("skills").select("skill_name, category").returns<Skill[]>(),
        supabase.from("awards").select("*").returns<Award[]>(),
        supabase.from("volunteering").select("*").returns<Volunteering[]>(),
      ])
      setData({
        profile:     profileResult.data ?? null,
        experiences: experiencesResult.data ?? [],
        projects:    projectsResult.data ?? [],
        publications: publicationsResult.data ?? [],
        education:   educationResult.data ?? [],
        skills:      skillsResult.data ?? [],
        awards:      awardsResult.data ?? [],
        volunteering: volunteeringResult.data ?? [],
      })
      setLoading(false)
    }
    fetchAll()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground text-sm animate-pulse">Loading…</p>
        </main>
      </>
    )
  }

  if (!data.profile) {
    return <div className="p-8 text-muted-foreground">Could not load profile.</div>
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={data.profile} />
        <ExperiencesSection experiences={data.experiences} />
        <ProjectsSection projects={data.projects} />
        <PublicationsSection publications={data.publications} />
        <EducationSkillsSection education={data.education} skills={data.skills} />
        <AwardsSection awards={data.awards} volunteering={data.volunteering} />
      </main>
      <Footer profile={data.profile} />
    </>
  )
}