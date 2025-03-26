import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Terms of Service - Usage Guidelines & Rules',
  description: 'Read our terms of service to understand how to use InstaGrab responsibly and legally.',
  keywords: 'instagram downloader terms, terms of service, InstaGrab terms, legal agreement, terms and conditions',
  alternates: {
    canonical: 'https://www.instagrab.download/terms',
  },
  openGraph: {
    title: 'InstaGrab Terms of Service - Usage Guidelines & Rules',
    description: 'Read our terms of service to understand how to use InstaGrab responsibly and legally.',
    url: 'https://www.instagrab.download/terms',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Terms of Service',
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

export default function TermsLayout({
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