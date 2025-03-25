'use client';

import React from 'react';
import { LinkIcon, ArrowDownTrayIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const DownloadGuide: React.FC = () => {
  return (
    <div className="my-10 py-8 px-4 sm:px-8 bg-white/10 backdrop-blur-sm rounded-xl">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-6">How to Download Instagram Content</h2>
      <p className="text-sm md:text-base text-white/90 text-center mb-8 max-w-2xl mx-auto">
        You must follow these three easy steps to download video, reels, and photo from Instagram (IG, Insta).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <DevicePhoneMobileIcon className="h-7 w-7 text-pink-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Copy URL</h3>
          <p className="text-white/80 text-center text-sm md:text-base">
            Open the Instagram application or website, copy the URL of the photo, video, reels, carousel, IGTV.
          </p>
          <div className="mt-4 w-full">
            <div className="relative w-full max-w-xs mx-auto">
              <div className="w-4/5 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-start font-medium pl-4 truncate">
                https://instagr...
              </div>
              <div className="absolute right-0 top-0 w-1/4 h-12 bg-pink-600 rounded-r-lg flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <LinkIcon className="h-7 w-7 text-pink-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Paste URL</h3>
          <p className="text-white/80 text-center text-sm md:text-base">
            Paste the URL into the text field above and click the "Download" button.
          </p>
          <div className="mt-4 w-full">
            <div className="w-4/5 h-12 bg-indigo-700 text-white rounded-lg flex items-center justify-center font-medium">
              Download
            </div>
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <ArrowDownTrayIcon className="h-7 w-7 text-pink-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Save Content</h3>
          <p className="text-white/80 text-center text-sm md:text-base">
            Click the "Save" button and your content will be downloaded to your device.
          </p>
          <div className="mt-4 w-full">
            <div className="relative w-full max-w-xs mx-auto">
              <div className="w-4/5 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 font-medium">
                <span>reel_123.mp4</span>
              </div>
              <div className="absolute right-0 top-0 w-1/4 h-12 bg-green-700 rounded-r-lg flex items-center justify-center">
                <ArrowDownTrayIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadGuide; 