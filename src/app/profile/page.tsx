'use client';

import { useState } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import UrlInputForm from '../components/UrlInputForm';
import Footer from '../components/Footer';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function ProfileDownloaderPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const handleUrlSubmit = (url: string) => {
    setSubmittedUrl(url);
    console.log('Submitted URL:', url);
    // Here we would handle the actual download functionality
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <div className="main-container flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-6 pb-10">
          {/* Hero Section */}
          <div className="text-center mb-10">
            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
              Instagram <span className="text-pink-200">Profile Downloader</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto">
              Download Instagram Profile Pictures in full HD resolution
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="mb-8 max-w-4xl mx-auto w-full px-2">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* URL Input Form */}
          <div className="mb-12 max-w-2xl mx-auto w-full px-2">
            <UrlInputForm onSubmit={handleUrlSubmit} />
          </div>
          
          {/* Results would go here */}
          {submittedUrl && (
            <div className="glass-effect rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Download Results</h2>
                <span className="text-xs text-pink-200 bg-pink-200/20 px-3 py-1 rounded-full">
                  {activeTab.toUpperCase()}
                </span>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-white/80 break-all">{submittedUrl}</p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-pink-100 transition-colors font-medium transform hover:scale-[1.05] active:scale-[0.98] hover:shadow-lg">
                  <ArrowDownTrayIcon className="h-5 w-5 animate-bounce-subtle" />
                  Download Profile Picture
                </button>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
} 