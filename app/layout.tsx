import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import {Providers} from "@/app/components/provider/jotaiProvider"
import Script from "next/script";

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
    default: "Hika Dev + Design",
    template: "%s | Hika Dev + Design",
  },
  description:
    "Hikaのポートフォリオサイト。UIデザインやフロントエンド開発、制作事例やブログを掲載しています。",
  keywords: ["ポートフォリオ", "UIデザイン", "UI", "UI開発", "フロントエンド", "React", "Next.js"],
  authors: [{ name: "Hika | ひか" }],
  creator: "Hika | ひか",
  openGraph: {
    title: "Hika Dev + Design",
    description:
      "UIデザインとフロントエンドを学びながらWebアプリを開発しています。",
    url: "https://hika-design.com",
    siteName: "Hika Dev + Design",
    images: [
      {
        url: "https://hika-design.com/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "hika dev + design",
    description: "UIデザインとフロントエンドの学び・個人開発の記録",
    images: ["https://hika-design.com/ogp.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9619029559934703"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header/>
          {children}
          <Footer/>
        </Providers>

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-R8XN21WSG5" />

      </body>
    </html>
  );
}
