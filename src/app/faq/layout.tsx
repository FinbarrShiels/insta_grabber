import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Help Center - Frequently Asked Questions',
  description: 'Get answers to common questions about using InstaGrab. Learn how to download Instagram content, troubleshoot issues, and understand our service better.',
  alternates: {
    canonical: 'https://www.instagrab.download/faq',
  },
  openGraph: {
    title: 'InstaGrab Help Center - Frequently Asked Questions',
    description: 'Get answers to common questions about using InstaGrab. Learn how to download Instagram content, troubleshoot issues, and understand our service better.',
    url: 'https://www.instagrab.download/faq',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Help Center',
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