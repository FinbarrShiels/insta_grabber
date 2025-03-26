import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Story Downloader - Save Instagram Stories in HD',
  description: 'Download Instagram stories in high quality for free. Save IG stories directly to your device without watermarks. Fast and easy to use.',
  keywords: 'instagram story downloader, download instagram stories, save instagram stories, download IG stories, HD instagram stories',
  alternates: {
    canonical: 'https://www.instagrab.download/story',
  },
  openGraph: {
    title: 'InstaGrab Story Downloader - Save Instagram Stories in HD',
    description: 'Download Instagram stories in high quality for free. Save IG stories directly to your device without watermarks. Fast and easy to use.',
    url: 'https://www.instagrab.download/story',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-story.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Story Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 