import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Mail, AtSign, Code, ArrowDown } from "lucide-react";
import type { Profile } from "@/types/profile";

type Props = {
    profile: Profile;
};

export function HeroSection({ profile }: Props) {
    return (
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-32">
            <div className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">

                {/* ── Left: Text content ── */}
                <div className="flex-1 space-y-8">
                    
                    {/* Name + title */}
                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                            {profile.name}
                        </h1>
                        {profile.title && (
                        <p className="text-lg md:text-xl font-medium text-muted-foreground">
                            {profile.title}
                        </p>
                        )}
                    </div>

                    {/* Bio */}
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                        {profile.bio}
                    </p>

                    {/* Action row */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Primary CTA */}
                        {profile.resume_url && (
                            <Button asChild variant="default" size="lg" className="font-semibold gap-2">
                                <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                                    <Download size={16} />
                                    Download Resume
                                </a>
                            </Button>
                        )}

                        {/* Icon buttons */}
                        <div className="flex items-center gap-1">
                            {profile.email && (
                                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                    <a href={`mailto:${profile.email}`} aria-label="Send email">
                                        <Mail size={18} />
                                    </a>
                                </Button>
                            )}
                            {profile.linkedin_url && (
                                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                                    <AtSign size={18} />
                                </a>
                                </Button>
                            )}
                            {profile.github_url && (
                                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                                        <Code size={18} />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60 pt-4">
                        <ArrowDown size={12} className="animate-bounce" />
                        <span>Scroll to explore</span>
                    </div>

                </div>
            
                {/* ── Right: Profile image ── */}
                {profile.profile_img_url && (
                    <div className="relative shrink-0">
                        {/* Decorative offset border */}
                        <div className="absolute inset-0 border border-border rounded-2xl translate-x-3 translate-y-3 -z-10" />
                        <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-2xl overflow-hidden border border-border">
                            <Image
                                src={profile.profile_img_url}
                                alt={`${profile.name} profile photo`}
                                fill
                                className="object-cover grayscale contrast-125"
                                priority
                            />
                        </div>
                    </div>
                )}
                
            </div>
        </section>
    )
}