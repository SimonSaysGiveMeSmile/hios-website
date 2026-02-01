import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "HiOS - Your Voice-First iOS Agent",
  description: "Talk to your phone. It gets things done. A native iOS agent that runs Shortcuts, reads your screen, and completes tasks hands-free.",
  keywords: ["iOS", "agent", "voice assistant", "shortcuts", "automation", "OCR", "vision"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
