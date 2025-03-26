import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | InstaGrab',
  description: 'Learn how InstaGrab collects, uses, and protects your data. Our privacy policy explains our commitment to safeguarding your information.',
  keywords: 'instagram downloader privacy, privacy policy, InstaGrab privacy, data protection, GDPR compliance',
  alternates: {
    canonical: 'https://www.instagrab.download/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | InstaGrab',
    description: 'Learn about how InstaGrab collects, uses, and protects your personal information.',
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