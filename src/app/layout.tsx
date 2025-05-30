import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anna & Michal | 24.1.2026 | Yard Resort",
  description: "Pozvánka na svatbu Anny a Michala, která se koná 24. ledna 2026 v Yard Resort, Předboj. Zimní svatba plná lásky a radosti.",
  keywords: "svatba, wedding, Anna, Michal, Yard Resort, Předboj, zimní svatba",
  authors: [{ name: "Anna & Michal" }],
  openGraph: {
    title: "Anna & Michal | Svatba 24.1.2026",
    description: "Pozvánka na naši svatbu 24.1.2026 v Yard Resort, Předboj",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
