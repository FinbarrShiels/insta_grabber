import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Profile Picture Downloader | Download IG Profile Photos in HD',
  description: 'Download Instagram profile pictures in full HD resolution. Save and view IG profile photos in original quality for free.',
  keywords: 'instagram profile picture downloader, download instagram dp, save instagram profile photo, download IG profile picture, full HD profile image',
  openGraph: {
    title: 'Instagram Profile Picture Downloader | Download IG Profile Photos in HD',
    description: 'Download Instagram profile pictures in full HD resolution. Save and view IG profile photos in original quality for free.',
    url: 'https://igrab.com/profile',
    siteName: 'iGrab - Instagram Downloader',
    images: [
      {
        url: 'https://igrab.com/og-profile.jpg',
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