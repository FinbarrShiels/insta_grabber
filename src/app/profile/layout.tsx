import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Profile Downloader | Save IG Profile Pictures in HD',
  description: 'Download Instagram profile pictures in full resolution for free. Save profile photos from any IG account anonymously.',
  keywords: 'instagram profile picture downloader, download instagram profile pic, save instagram profile photo, IG DP downloader, full size profile picture',
  openGraph: {
    title: 'Instagram Profile Downloader | Save IG Profile Pictures in HD',
    description: 'Download Instagram profile pictures in full resolution for free. Save profile photos from any IG account anonymously.',
    url: 'https://instagrab.download/profile',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://instagrab.download/og-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Profile Picture Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ProfileLayout({
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