import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Story Downloader - Save Expiring IG Stories',
  description: 'Download Instagram stories before they expire. Save IG stories without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram stories.',
  alternates: {
    canonical: 'https://www.instagrab.download/story',
  },
  openGraph: {
    title: 'Instagram Story Downloader - Save Expiring IG Stories',
    description: 'Download Instagram stories before they expire. Save IG stories without watermarks. Fast, free, and no registration needed. Perfect for saving your favorite Instagram stories.',
    url: 'https://www.instagrab.download/story',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-story.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Story Downloader',
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