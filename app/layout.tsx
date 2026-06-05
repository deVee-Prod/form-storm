import type { Metadata } from "next";
import "./globals.css";
import { DriftingGridBackground } from './components/DriftingGridBackground';

export const metadata: Metadata = {
  title: "Storm Form",
  description: "Label Distribution System",
  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className="relative min-h-full flex flex-col">
        <DriftingGridBackground />
        <div className="relative z-10 flex flex-col min-h-full">{children}</div>
      </body>
    </html>
  );
}