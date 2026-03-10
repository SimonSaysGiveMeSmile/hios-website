import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HiOS - Your Voice-First iOS Agent",
  description: "Talk to your phone. It gets things done. A native iOS agent that runs Shortcuts, reads your screen, and completes tasks hands-free.",
  keywords: ["iOS", "agent", "voice assistant", "shortcuts", "automation", "OCR", "vision"],
  icons: {
    icon: '/logo-black.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-black.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0"
          height="0"
          style={{ position: 'absolute', overflow: 'hidden' }}
          aria-hidden="true"
        >
          <defs>
            <filter
              id="glass-distortion"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.002 0.002"
                numOctaves={1}
                seed={92}
                result="noise"
              />
              <feGaussianBlur
                in="noise"
                stdDeviation={0.5}
                result="blurred"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurred"
                scale={3}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
