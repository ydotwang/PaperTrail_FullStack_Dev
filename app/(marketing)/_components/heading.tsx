"use client";

import { Button} from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {useConvexAuth} from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className = "max-w-3xl space-y-4">
            <h1 className = "text-3xl sm:text-5xl md:text-6xl font-bold">
            Capture Your Thoughts <br /> Share Your Journey <br /> Welcome to
                <br /><span className = "underline" >
                    PaperTrail</span> 
            </h1>
            <h3 className = "text-base sm:text-xl md:text-2xl font-medium">
                Papertrail, where you can start your own stories.
            </h3>
            {isLoading && (
                <div className = "w-full h-[1px] bg-gray-200 animate-pulse">
                    <Spinner size = "lg"/>
                </div>
            )   }
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href = "/documents">
                        Enter PaperTrail
                        <ArrowRight className = "h-4 w-4 ml-2" size = {24} />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get PaperTrail free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
            

        </div>
    );
}