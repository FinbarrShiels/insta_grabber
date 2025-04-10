'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import UrlInputForm from '../components/UrlInputForm';
import ContentResults from '../components/ContentResults';
import Footer from '../components/Footer';
import DemoSection from '../components/DemoSection';
import DownloadSteps from '../components/DownloadSteps';
import { fetchInstagramContent } from '../utils/api';
import { Metadata } from 'next';

interface Resource {
  type: 'image' | 'video';
  url: string;
  thumb?: string;
  thumbnail?: string;
}

interface ContentInfo {
  title: string;
  description: string;
  resources: Resource[];
  owner?: {
    username: string;
    full_name: string;
  };
  created_at_utc?: string;
}

interface ContentData {
  info: ContentInfo;
  error?: string;
}

export const metadata: Metadata = {
  title: 'Instagram Photo Downloader - Download HD Photos Without Watermark',
  description: 'Download Instagram photos in HD quality without watermarks. Free, fast, and easy to use Instagram photo downloader.',
  keywords: 'instagram photo downloader, download instagram photos, instagram photo saver, save instagram photos, instagram photo download',
  openGraph: {
    title: 'Instagram Photo Downloader - Download HD Photos Without Watermark',
    description: 'Download Instagram photos in HD quality without watermarks. Free, fast, and easy to use Instagram photo downloader.',
    url: 'https://www.instagrab.download/photo',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Photo Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/photo',
  },
};

export default function PhotoDownloaderPage() {
  const [activeTab, setActiveTab] = useState('photo');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ContentData | null>(null);

  const handleUrlSubmit = async (submittedUrl: string) => {
    setSubmittedUrl(submittedUrl);
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetchInstagramContent(submittedUrl);
      if (response.status === 'error') {
        setError(response.message || 'Failed to fetch content');
        return;
      }

      // Transform the API response to match ContentData type
      const transformedData: ContentData = {
        info: {
          title: response.info?.shortcode || 'Instagram Content',
          description: response.info?.caption || '',
          resources: (response.info?.resources || []).map(resource => ({
            type: resource.type === 'video' ? 'video' : 'image',
            url: resource.url,
            thumb: resource.thumb,
            thumbnail: resource.thumbnail
          })),
          owner: response.info?.owner ? {
            username: response.info.owner.username,
            full_name: response.info.owner.full_name
          } : undefined,
          created_at_utc: response.info?.created_at_utc
        }
      };

      setData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-pink flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 pb-20 max-w-[984px]">
        {/* Hero Section */}
        <div className="text-center py-6 md:py-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Instagram <span className="text-brand-teal-light">Photo Downloader</span>
          </h1>
          <p className="text-white text-sm md:text-base max-w-[984px] mx-auto">
            Download Instagram Photos in high resolution without watermarks
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-5">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* URL Input Form */}
        <div className="mb-8">
          <UrlInputForm onSubmit={handleUrlSubmit} />
        </div>
        
        {/* Results Section */}
        <ContentResults 
          submittedUrl={submittedUrl}
          loading={loading}
          error={error}
          data={data}
          contentType={activeTab}
        />
        
        {/* Demo Section */}
        <DemoSection 
          title="Download Instagram Photos"
          content="Save any Instagram photo in its original high resolution with our Photo Downloader. Our tool preserves the original quality so you can download your favorite Instagram photos without any loss in clarity or detail. Perfect for saving inspiration, memories, or creative content."
          imageSrc="/images/photo.png"
          imageAlt="Instagram Photo Downloader Demo"
        />
        
        {/* Download Steps Section */}
        <DownloadSteps />
      </div>
      
      <Footer />
    </main>
  );
} 