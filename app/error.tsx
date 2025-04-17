"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <p className="text-muted-foreground text-sm">
        {error.message || "An unexpected error occurred"}
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/documents">
            Go back to documents
          </Link>
        </Button>
      </div>
    </div>
  );
}
