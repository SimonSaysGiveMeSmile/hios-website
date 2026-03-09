import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
