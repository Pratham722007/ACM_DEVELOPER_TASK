import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Loader from "@/components/ui/Loader";
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
      <body className="min-h-full flex flex-col antialiased bg-[#f5f0e8] text-[#111111] overflow-x-hidden">
        <Loader>
          <Navbar />
          <main className="flex-1 relative z-0">{children}</main>
          <Footer />
        </Loader>
      </body>
    </html>
  );
}
