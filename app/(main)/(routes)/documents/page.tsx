"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useUser } from "@clerk/clerk-react";
import { Plus, PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" }).then((documentId) => {
            router.push(`/documents/${documentId}`);
        });
        toast.promise(promise, {
            loading: "Creating new trail...",
            success: "Trail created!",
            error: "Failed to create trail",
        });
    };

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
            <Button onClick={onCreate}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create a new trail
            </Button>
        </div>
    )
}

export default DocumentsPage;