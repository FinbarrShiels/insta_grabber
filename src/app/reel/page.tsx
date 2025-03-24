'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import UrlInputForm from '../components/UrlInputForm';
import ContentResults from '../components/ContentResults';
import Footer from '../components/Footer';
import DownloadGuide from '../components/DownloadGuide';
import FeaturesSection from '../components/FeaturesSection';
import { fetchInstagramContent } from '../utils/api';

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

export default function ReelDownloaderPage() {
  const [activeTab, setActiveTab] = useState('reel');
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
      
      <div className="container mx-auto px-4 mb-8 flex-grow max-w-[900px]">
        {/* Hero Section */}
        <div className="text-center py-8 md:py-12">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 whitespace-nowrap xs:whitespace-normal">
            Instagram <span className="text-white">Reel Downloader</span>
          </h1>
          <p className="text-white text-sm md:text-base text-sm md:text-base max-w-[900px] mx-auto">
            Download Instagram Reels in HD quality without watermarks
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* URL Input Form */}
        <div className="mt-6 mb-8">
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
        
        {/* Download Guide Section */}
        <DownloadGuide />
        
        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-pink-300/30 to-transparent my-16"></div>
        
        {/* Features Section */}
        <FeaturesSection />
      </div>
      
      <Footer />
    </main>
  );
} 