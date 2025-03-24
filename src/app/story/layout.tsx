import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Story Downloader | Save IG Stories Before They Disappear',
  description: 'Download Instagram stories in high quality before they disappear. Save IG stories anonymously for free without login.',
  keywords: 'instagram story downloader, download instagram stories, save instagram stories, download IG stories, anonymous story downloader',
  openGraph: {
    title: 'Instagram Story Downloader | Save IG Stories Before They Disappear',
    description: 'Download Instagram stories in high quality before they disappear. Save IG stories anonymously for free without login.',
    url: 'https://igrab.com/story',
    siteName: 'iGrab - Instagram Downloader',
    images: [
      {
        url: 'https://igrab.com/og-story.jpg',
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