import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToneLab - AI Music Generation",
  description: "Generate music with multiple AI models powered by Pollinations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
