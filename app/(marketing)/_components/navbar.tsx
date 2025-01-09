"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export const Navbar = () => {
    const scrolled = useScrollTop();
    return(
        <div className = {cn(
            "z-50 g-background fixed top-0 flex items-center w-full p-6 backdrop-blur-md", 
            scrolled && "border-b shadow-sm",
            "dark:bg-[rgba(31,31,47,0.8)]",
            "bg-[rgba(255,255,255,0.8)]"
        )}>
            <Logo/>
            <div className = "md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <ModeToggle/>
                <p>Home</p>
                <p>Features</p>
                <p>Blog</p>
            </div>
        </div>
    )
}