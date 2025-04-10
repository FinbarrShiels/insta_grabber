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
  title: 'Instagram Video Downloader - Download HD Videos Without Watermark',
  description: 'Download Instagram videos in HD quality without watermarks. Free, fast, and easy to use Instagram video downloader.',
  keywords: 'instagram video downloader, download instagram videos, instagram video saver, save instagram videos, instagram video download',
  openGraph: {
    title: 'Instagram Video Downloader - Download HD Videos Without Watermark',
    description: 'Download Instagram videos in HD quality without watermarks. Free, fast, and easy to use Instagram video downloader.',
    url: 'https://www.instagrab.download/video',
    siteName: 'InstaGrab',
    images: [
      {
        url: 'https://www.instagrab.download/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Video Downloader',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.instagrab.download/video',
  },
};

export default function VideoDownloaderPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ContentData | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setSubmittedUrl(url);
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const response = await fetchInstagramContent(url);
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
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 pb-20 max-w-[984px]">
        {/* Hero Section */}
        <div className="text-center py-6 md:py-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Instagram <span className="text-white">Video Downloader</span>
          </h1>
          <p className="text-white text-sm md:text-base max-w-[984px] mx-auto">
            Download Instagram Videos in HD quality without watermarks
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
          title="Download Instagram Videos"
          content="Save Instagram videos in high definition with our Video Downloader. Our tool allows you to download any Instagram video at its maximum available quality without watermarks. Whether it's a tutorial, entertainment, or personal memory, download and keep your favorite videos offline."
          imageSrc="/images/video.png"
          imageAlt="Instagram Video Downloader Demo"
        />
        
        {/* Download Steps Section */}
        <DownloadSteps />
      </div>
      
      <Footer />
    </main>
  );
} 