'use client';

import React from 'react';
import Image from 'next/image';

const DownloadGuide: React.FC = () => {
  return (
    <div className="py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-blue-600 text-center mb-3">
        How to download from Instagram?
      </h2>
      
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      
      <p className="text-center text-gray-600 text-sm mb-6">
        You must follow these three easy steps to download videos, reels, and photos from Instagram (IG, Insta).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Step 1 - Using the copy.png image */}
        <div>
          <img 
            src="/images/copy.png" 
            alt="Step 1: Copy Link" 
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Step 2 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6 text-center">
            <div className="bg-purple-400/40 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="8" y1="14" x2="16" y2="14"></line>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-3">Step 2: Paste Link</h3>
            <p className="text-white/90">
              Return to the InstaGrab website, paste the link into the input field and click the "Download" button.
            </p>
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6 text-center">
            <div className="bg-purple-400/40 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-3">Step 3: Download</h3>
            <p className="text-white/90">
              Quickly you will get the results with several quality options. Download quality that fits your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadGuide; 