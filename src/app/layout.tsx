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
  title: "DisputeLens AI | Enterprise Post-Delivery Dispute & Fraud Triage Engine",
  description: "Next-generation multimodal dispute triage platform for e-commerce logistics (Flipkart / Ekart). Detects Open Box Delivery (OBD) mismatches, box tampering, counterfeit serials, and dwell-time fraud in seconds.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" }
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#090A0F] text-[#F1F5F9]"
      >
        {children}
      </body>
    </html>
  );
}
