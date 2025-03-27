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
        You must follow these three easy steps to download videos, reels, and photos from Instagram (IG, Insta). Follow the simple steps below:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center">
            <div className="relative w-full h-16 mb-2">
              <Image 
                src="/images/copy-url-step.svg" 
                alt="Copy URL"
                className="rounded-md object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-white font-medium mt-2">Copy the URL</h3>
            <p className="text-white/80 text-sm mt-1">
              Open the Instagram application or website, copy the URL of the photos, videos, reels, and stories.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center">
            <div className="relative w-full h-16 mb-2">
              <Image 
                src="/images/paste-link-step.svg" 
                alt="Paste the link"
                className="rounded-md object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-white font-medium mt-2">Paste the link</h3>
            <p className="text-white/80 text-sm mt-1">
              Return to the InstaGrab website, paste the link into the input field and click the "Download" button.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center">
            <div className="relative w-full h-16 mb-2">
              <Image 
                src="/images/download-step.svg" 
                alt="Download"
                className="rounded-md object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-white font-medium mt-2">Download</h3>
            <p className="text-white/80 text-sm mt-1">
              Quickly you will get the results with several quality options. Download quality that fits your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadGuide; 