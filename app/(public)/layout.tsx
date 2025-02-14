import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full dark:bg-[#2F2F3F] bg-[#F5F5F5]">
      {children}
    </div>
  );
}
