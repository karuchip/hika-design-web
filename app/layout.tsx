import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hika-design.com"),
  title: {
    default: "Hika Design",
    template: "%s | Hika Design",
  },
  description:
    "Hikaのポートフォリオサイト。UIデザインやフロントエンド開発、制作事例やブログを掲載しています。",
  keywords: ["ポートフォリオ", "UIデザイン", "フロントエンド", "Next.js"],
  authors: [{ name: "Hika | ひか" }],
  creator: "Hika | ひか",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-R8XN21WSG5" />

      </body>
    </html>
  );
}
