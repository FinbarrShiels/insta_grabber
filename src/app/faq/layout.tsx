import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - InstaGrab Instagram Downloader | Common Questions & Answers',
  description: 'Find answers to frequently asked questions about using InstaGrab for downloading Instagram photos, videos, reels and stories. Learn how our tool works and get help.',
  keywords: 'instagram downloader faq, instagram download help, insta grabber help, instagram saving questions, instagram download guide',
  openGraph: {
    title: 'FAQ - InstaGrab Instagram Downloader | Common Questions & Answers',
    description: 'Find answers to frequently asked questions about using InstaGrab for downloading Instagram photos, videos, reels and stories.',
    url: 'https://igrab.com/faq',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://igrab.com/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab FAQ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function FaqLayout({
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