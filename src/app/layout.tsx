import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CREX Digital",
    template: "%s | CREX Digital",
  },
  description:
    "Intelligent digital marketing platform for multi-family apartments and commercial real estate",
  keywords: [
    "digital marketing",
    "real estate marketing",
    "apartment marketing",
    "multifamily marketing",
    "commercial real estate",
    "property marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
