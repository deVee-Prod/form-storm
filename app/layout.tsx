import type { Metadata } from "next";
import "./globals.css";
import { DriftingGridBackground } from './components/DriftingGridBackground';
import { ToolHeader } from './components/ToolHeader';


export const metadata: Metadata = {
  title: "Storm Form",
  description: "Easily generate info files to send new songs to record labels.",
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    { rel: 'icon', url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    { rel: 'icon', url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '512x512', type: 'image/png' },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Storm Form",
    description: "Easily generate info files to send new songs to record labels.",
    images: ["https://www.devee-music.com/social-preview.jpg"]
  },
  openGraph: {
    title: "Storm Form",
    description: "Easily generate info files to send new songs to record labels.",
    images: ["https://www.devee-music.com/social-preview.jpg"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className="relative min-h-full flex flex-col">
        <DriftingGridBackground />
        <div className="relative z-10 flex flex-col min-h-full">
          <ToolHeader />
          {children}
        </div>
      </body>
    </html>
  );
}