import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Page",
  description: "A test page for development purposes",
};

export default function TestPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Test Page</h1>
    </div>
  );
}