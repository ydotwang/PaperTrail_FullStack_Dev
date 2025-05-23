"use client";
import { Spinner } from "@/components/spinner";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";

const MarketingLayout = ({ 
    children 
}: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    
    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }
    // if (!isAuthenticated) {
    //     return redirect("/");
    // }
    return (
        <div className="h-Full flex dark:bg-[#1F1F2F]">
            <Navbar/>
            <main className="h-full flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default MarketingLayout;



