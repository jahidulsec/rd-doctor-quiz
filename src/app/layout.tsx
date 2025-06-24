import type { Metadata } from "next";
import "./globals.css";
import ProgressProvider from "@/providers/progress-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Doctor Quiz - Radiant Digital",
  description: "A quiz web app for doctor",
};

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ProgressProvider>
          {children}
          <Toaster closeButton richColors position="top-right" />
        </ProgressProvider>
      </body>
    </html>
  );
}
