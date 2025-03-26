import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | InstaGrab',
  description: 'Find answers to common questions about using InstaGrab to download Instagram content.',
  keywords: 'instagram downloader faq, frequently asked questions, help center, support, how to use instagram downloader',
  alternates: {
    canonical: 'https://www.instagrab.download/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | InstaGrab',
    description: 'Find answers to common questions about using InstaGrab to download Instagram content.',
    url: 'https://www.instagrab.download/faq',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab FAQ',
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