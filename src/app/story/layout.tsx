import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Story Downloader | Save IG Stories Before They Disappear',
  description: 'Download Instagram stories in high quality before they disappear. Save IG stories anonymously without leaving a view trace.',
  keywords: 'instagram story downloader, download instagram stories, save instagram stories, download IG stories, anonymous story downloader',
  alternates: {
    canonical: 'https://www.instagrab.download/story',
  },
  openGraph: {
    title: 'Instagram Story Downloader | Save IG Stories in HD Quality',
    description: 'Download Instagram stories in high quality for free. Save IG stories directly to your device without watermarks. Fast and easy to use.',
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