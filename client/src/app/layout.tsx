import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});


export const metadata: Metadata = {
  title: "Lumeva — Skill Barter Platform",
  description: "Swipe, match, and barter skills with builders worldwide. No money, just growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
