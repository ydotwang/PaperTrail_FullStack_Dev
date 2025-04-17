import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">Page not found</h2>
      <p className="text-muted-foreground text-sm">
        Could not find the requested page
      </p>
      <Button asChild>
        <Link href="/documents">
          Go back to documents
        </Link>
      </Button>
    </div>
  );
} 