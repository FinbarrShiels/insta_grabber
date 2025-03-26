import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  metadataBase: new URL('https://www.instagrab.download'),
  title: "Instagram Downloader | Download Instagram Videos, Photos, Reels",
  description: "Download Instagram Videos, Photos, Reels, Stories & Carousels easily with InstaGrab. No watermarks, fast and free!",
  applicationName: 'InstaGrab',
  keywords: ['instagram downloader', 'download instagram', 'instagram video downloader', 'instagram photo downloader', 'instagram reel downloader', 'instagram story downloader', 'download stories', 'save instagram videos'],
  authors: [{ name: 'InstaGrab Team' }],
  creator: 'InstaGrab',
  publisher: 'InstaGrab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.instagrab.download',
  },
  openGraph: {
    title: 'Instagram Content Downloader | Save Photos, Videos, Reels & Stories',
    description: 'Download Instagram content in high quality for free. Save photos, videos, reels, stories, and carousels directly to your device without watermarks.',
    url: 'https://www.instagrab.download',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Content Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Content Downloader | Save Photos, Videos, Reels & Stories',
    description: 'Download Instagram content in high quality for free. Save photos, videos, reels, stories, and carousels directly to your device without watermarks.',
    images: ['https://www.instagrab.download/og-main.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Dao4Q2AlSQdxInJXf3Q1RMiLWIKsjbWhjfkbmNDXNHA',
  },
  other: {
    "google-adsense-account": "ca-pub-1990518122312332",
  },
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/icon-192.svg' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WMCEB4H2C6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WMCEB4H2C6');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
