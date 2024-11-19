"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
export const Navbar = () => {
    const scrolled = useScrollTop();
    return(
        <div className = {cn("z-50 g-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
            <Logo/>
            <div className = "md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <button className = "hidden md:flex items-center gap-x-4">
                    <p>Home</p>
                    <p>Features</p>
                    <p>Blog</p>
                </button>
            </div>

        </div>
    )

}