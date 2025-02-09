"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link  from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return(
        <div className={cn(
            "z-50 fixed top-0 flex items-center w-full p-6", 
            scrolled && "border-b shadow-sm bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(31,31,47,0.8)]"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                   <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </SignInButton>

                    <SignInButton mode="modal">
                        <Button size="sm">
                            Get PaperTrail free
                        </Button>
                    </SignInButton>
                    </>

                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button variant = "ghost" size = "sm" asChild>
                        <Link href = "/documents">
                            Enter PaperTrail
                        </Link>
                       
                    </Button>
                    <UserButton
                    afterSignOutUrl = "/"
                    />
                    </>
                )}
                
                <ModeToggle/>
                {/* <p>Home</p> 
                <p>Features</p>
                <p>Blog</p> */}
            </div>
        </div>
    )
}