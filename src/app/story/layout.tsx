import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Story Downloader | Save IG Stories Before They Disappear',
  description: 'Download Instagram stories in high quality before they disappear. Save IG stories anonymously without leaving a view trace.',
  keywords: 'instagram story downloader, download instagram stories, save instagram stories, download IG stories, anonymous story downloader',
  openGraph: {
    title: 'Instagram Story Downloader | Save IG Stories Before They Disappear',
    description: 'Download Instagram stories in high quality before they disappear. Save IG stories anonymously without leaving a view trace.',
    url: 'https://instagrab.io/story',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://instagrab.io/og-story.jpg',
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