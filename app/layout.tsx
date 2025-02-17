import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { url } from "inspector";
import { ThemeProvider } from "../components/providers/theme-provider";
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PaperTrail",
  description: "The connected work of a designer and developer.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/Logo1.svg",
        href: "/Logo1.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/Logo2.svg",
        href: "/Logo2.svg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="papertrail-theme">
              <Toaster position="bottom-center"/>
              <ModalProvider/>
            {children}
          </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}
