export type Profile = {
    name: string;
    title: string | null;
    bio: string;
    profile_img_url: string | null;
    resume_url: string | null;
    email: string | null;
    linkedin_url: string | null;
    github_url: string | null;
};

export type ExperienceType = "research" | "work" | "course" | "other";

export type Experience = {
    experience_name: string;
    experience_type: ExperienceType | null;
    location: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    picture_url: string | null;
}

export type Project = {
    project_id: number;
    project_name: string;
    project_type: "ML" | "SE" | null;
    tags: string | null;
    preview_url: string | null;
    project_date: string | null;
    description: string | null;
    repo_url: string | null;
    demo_url: string | null;
    tech_stacks: string | null;
};

export type Publication = {
  publication_id: number;
  title: string;
  authors: string | null;
  published_in: string | null;
  paper_url: string | null;
  description: string | null;
  repo_url: string | null;
  published_date: string | null;
};

export type Education = {
  education_name: string;      
  education_category: string; 
  start_date: string | null;
  end_date: string | null;
  grade: number | null;
  description: string | null;
  logo_url: string | null;
};

export type Skill = {
  skill_name: string;
  category: string | null;
};

export type Award = {
  award_name: string;
  giver: string;
  date_given: string | null;
  description: string | null;
  logo_url: string | null;
};

export type Volunteering = {
  volunteer_name: string;
  start_date: string;
  end_date: string | null;
  organization: string | null;
  description: string | null;
  logo_url: string | null;
};