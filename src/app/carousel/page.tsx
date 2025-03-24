'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import UrlInputForm from '../components/UrlInputForm';
import ContentResults from '../components/ContentResults';
import Footer from '../components/Footer';
import { fetchInstagramContent } from '../utils/api';

interface ContentData {
  info: {
    title: string;
    description: string;
    resources: Array<{
      type: 'image' | 'video';
      url: string;
      thumb?: string;
      thumbnail?: string;
    }>;
    owner?: {
      username: string;
      full_name: string;
    };
    created_at_utc?: string;
  };
  error?: string;
}

export default function CarouselPage() {
  const [activeTab, setActiveTab] = useState('carousel');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ContentData | null>(null);

  const handleUrlSubmit = async (submittedUrl: string) => {
    setUrl(submittedUrl);
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
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 mb-8 flex-grow max-w-[900px]">
        {/* Hero Section */}
        <div className="text-center py-8 md:py-12">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 whitespace-nowrap xs:whitespace-normal">
            Instagram <span className="text-pink-200">Carousel Downloader</span>
          </h1>
          <p className="text-pink-100 text-sm md:text-base max-w-[900px] mx-auto">
            Download Instagram Carousel posts in HD quality without watermarks
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
          submittedUrl={url}
          loading={loading}
          error={error}
          data={data}
          contentType={activeTab}
        />
      </div>
      
      <Footer />
    </main>
  );
} 