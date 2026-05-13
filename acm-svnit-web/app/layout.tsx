import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ACM SVNIT — Where Curiosity Meets Code",
    template: "%s | ACM SVNIT",
  },
  description:
    "The official website of the ACM Student Chapter at SVNIT Surat. Explore events, meet the team, and discover our domains in computing.",
  keywords: [
    "ACM",
    "SVNIT",
    "coding",
    "hackathon",
    "programming",
    "computer science",
    "student chapter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
