import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Reel Analyzer PRO",
  description: "Sistema premium per analizzare retention, hook e rischio flop di reel, TikTok, UGC e Meta Ads video."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
