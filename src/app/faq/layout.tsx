import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | InstaGrab Help Center',
  description: 'Find answers to frequently asked questions about using InstaGrab for downloading Instagram photos, videos, reels and stories. Learn how our tool works and get help.',
  keywords: 'instagram downloader faq, instagram download help, insta grabber help, instagram saving questions, instagram download guide',
  openGraph: {
    title: 'Frequently Asked Questions | InstaGrab Help Center',
    description: 'Find answers to frequently asked questions about using InstaGrab for downloading Instagram photos, videos, reels and stories.',
    url: 'https://instagrab.download/faq',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://instagrab.download/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab FAQ and Help',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function FAQLayout({
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