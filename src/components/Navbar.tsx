"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, House} from "lucide-react";

const NAV_LINKS = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Publications", href: "#publications" },
    { label: "Skills", href: "#skills" },
    { label: "Awards", href: "#awards" },
]

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
            <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-12 h-16">
                {/* --- Wordmark --- */}
                <a 
                    href="#"
                    className="text-2xl font-bold tracking-tighter text-primary"
                >
                    <House size={24}/>
                </a>

                {/* --- Desktop Links --- */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-150">
                            {link.label}
                        </a>
                    ))}

                    {/* --- Contatct Button --- */}
                    <Button
                        variant="default"
                        size="sm"
                        className="font-bold"
                        onClick={() => window.location.href = "mailto:malifalhakim11@gmail.com"}>
                        Contact
                    </Button>
                </div>

                {/* --- Mobile Hamburger --- */}
                <button
                    className="md:hidden text-primary p-1"
                    aria-label="Toggle menu"
                    onClick={() => setMobileOpen((prev) => !prev)}
                >
                    {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </nav>

            {/* --- Mobile Dropdown --- */}
            {mobileOpen && (
                <div className="md:hidden bg-background border-b border-border px-6 pb-4 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}

                    <Button variant="default" size="sm" className="w-full font-bold" onClick={() => window.location.href = "mailto:malifalhakim11@gmail.com"}>
                        Contact
                    </Button>
                </div>
            )}
        </header>
    )
}