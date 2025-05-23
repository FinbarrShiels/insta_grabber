'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import UrlInputForm from './components/UrlInputForm';
import ContentResults from './components/ContentResults';
import Footer from './components/Footer';
import DemoSection from './components/DemoSection';
import DownloadSteps from './components/DownloadSteps';
import FeaturesSection from './components/FeaturesSection';
import { fetchInstagramContent } from './utils/api';
import { WebsiteJsonLd, SoftwareApplicationJsonLd, FAQJsonLd } from './components/JsonLd';

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

// FAQ data for structured data
const faqData = [
  {
    question: "How do I download Instagram content using InstaGrab?",
    answer: "Simply copy the URL of any Instagram post, reel, or story you want to download, paste it into the URL field on our site, and click Download. We'll process your request and provide download options."
  },
  {
    question: "Is InstaGrab free to use?",
    answer: "Yes, InstaGrab is completely free to use. There are no hidden fees or subscriptions required."
  },
  {
    question: "Do I need to create an account to use InstaGrab?",
    answer: "No, you don't need to create an account or login to use InstaGrab. It's a direct and anonymous service."
  },
  {
    question: "Can I download private Instagram content?",
    answer: "No, InstaGrab works only with publicly available Instagram content that is accessible without login."
  },
  {
    question: "What types of Instagram content can I download?",
    answer: "You can download photos, videos, reels, stories, and carousel posts (multiple photos/videos in a single post)."
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('');
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
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 to-pink-500">
      {/* Structured Data */}
      <WebsiteJsonLd />
      <SoftwareApplicationJsonLd />
      <FAQJsonLd questions={faqData} />
      
      <Header />
      
      <div className="container mx-auto px-4 pb-20 max-w-[984px]">
        {/* Hero Section */}
        <div className="text-center py-6 md:py-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Instagram <span className="text-white">Downloader</span>
          </h1>
          <p className="text-white text-sm md:text-base max-w-[984px] mx-auto">
            Download Instagram posts, reels, and stories in HD quality without watermarks
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
          title="Download Instagram Content"
          content="InstaGrab makes it simple to download any Instagram content in high quality. Whether it's photos, videos, reels, stories, or carousels, our tool handles it all with just a simple paste of the URL. No registration, no watermarks, just fast and reliable downloading."
          imageSrc="/images/photo.png"
          imageAlt="Instagram Downloader Demo"
        />
        
        {/* Download Steps Section */}
        <DownloadSteps />
        
        {/* Features Section */}
        <FeaturesSection />
      </div>
      
      <Footer />
    </main>
  );
}
