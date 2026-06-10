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
  title: "Muhammad Alif Al Hakim",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ── Animated background ── */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Top-left orb */}
          <div className="bg-orb-1 absolute -top-52 -left-52 w-[600px] h-[600px] rounded-full bg-white/[0.125] blur-[120px]" />
          {/* Bottom-right orb */}
          <div className="bg-orb-2 absolute -bottom-52 -right-32 w-[700px] h-[700px] rounded-full bg-white/[0.125] blur-[140px]" />
          {/* Center accent orb — very faint */}
          <div className="bg-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.1] blur-[100px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
