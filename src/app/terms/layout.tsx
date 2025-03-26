import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | InstaGrab',
  description: 'Read InstaGrab\'s Terms of Service. These terms govern your use of our Instagram content downloader service.',
  keywords: 'instagram downloader terms, terms of service, InstaGrab terms, legal agreement, terms and conditions',
  alternates: {
    canonical: 'https://www.instagrab.download/terms',
  },
  openGraph: {
    title: 'Terms of Service | InstaGrab',
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