import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaGrab Privacy Policy - Your Data Protection Guide',
  description: 'Learn how InstaGrab protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices.',
  keywords: 'instagram downloader privacy, privacy policy, InstaGrab privacy, data protection, GDPR compliance',
  alternates: {
    canonical: 'https://www.instagrab.download/privacy',
  },
  openGraph: {
    title: 'InstaGrab Privacy Policy - Your Data Protection Guide',
    description: 'Learn how InstaGrab protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices.',
    url: 'https://www.instagrab.download/privacy',
    siteName: 'InstaGrab - Instagram Content Downloader',
    images: [
      {
        url: 'https://www.instagrab.download/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'InstaGrab Privacy Policy',
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

export default function PrivacyLayout({
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