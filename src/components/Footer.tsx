// src/components/Footer.tsx
import type { Profile } from "@/types/profile";
import { AtSign, Code2, Mail } from "lucide-react";

type Props = {
  profile: Pick<Profile, "name" | "linkedin_url" | "github_url" | "email">;
};

export function Footer({ profile }: Props) {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "LinkedIn", href: profile.linkedin_url,        icon: <AtSign size={15} /> },
    { label: "GitHub",   href: profile.github_url,          icon: <Code2   size={15} /> },
    { label: "Email",    href: profile.email ? `mailto:${profile.email}` : null, icon: <Mail size={15} /> },
  ].filter((l) => l.href);

  return (
    <footer className="w-full border-t border-border mt-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12
                      flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: copyright */}
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {currentYear} {profile.name}. All rights reserved.
        </p>

        {/* Right: social links */}
        <div className="flex items-center gap-6">
          {links.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href!}
              target={href!.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground
                         hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {icon}
              {label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}