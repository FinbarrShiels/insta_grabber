'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import UrlInputForm from './components/UrlInputForm';
import ContentResults from './components/ContentResults';
import Footer from './components/Footer';
import { fetchInstagramContent, InstagramApiResponse } from './utils/api';

export default function Home() {
  const [activeTab, setActiveTab] = useState('video');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InstagramApiResponse | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setSubmittedUrl(url);
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const response = await fetchInstagramContent(url);
      setData(response);
      if (response.status !== 'success') {
        setError(response.message || 'Failed to fetch content.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
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
            Instagram <span className="text-pink-200">Downloader</span>
          </h1>
          <p className="text-pink-100 text-sm md:text-base max-w-[900px] mx-auto">
            Download Instagram Videos, Photos, Reels, Stories & Carousel content easily
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
      </div>
      
      <Footer />
    </main>
  );
}
