"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useUser } from "@clerk/clerk-react";
import { Plus, PlusCircle } from "lucide-react";
const DocumentsPage = () => {
    const { user } = useUser();
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/writer.svg"
                alt="Empty"
                width={300}
                height={300}
                className="dark:hidden"
            />
                <Image
                src="/writer.svg"
                alt="Empty"
                width={300}
                height={300}
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s PaperTrail
            </h2>
            <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create a new document
            </Button>
        </div>
    )
}

export default DocumentsPage;