'use client';

import React from 'react';
import { ClipboardIcon, ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const DownloadGuide: React.FC = () => {
  return (
    <section className="mt-16 mb-12">
      <h2 className="text-center text-3xl font-bold text-white mb-2">
        How to download from Instagram?
      </h2>
      <div className="w-full max-w-4xl mx-auto h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded mb-8"></div>
      
      <p className="text-center text-white/80 mb-10 max-w-3xl mx-auto">
        You must follow these three easy steps to download video, reels, and photo from Instagram (IG, Insta). 
        Follow the simple steps below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105">
          <div className="p-6 flex flex-col items-center">
            <div className="w-full h-48 bg-purple-700/40 rounded-lg flex items-center justify-center mb-4 relative">
              <div className="w-4/5 h-12 bg-white/90 rounded-lg flex items-center pl-4 text-gray-500 text-sm">
                instagram.com/p/CmcRCl...
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <ClipboardIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Copy the URL</h3>
            <p className="text-white/80 text-center text-sm">
              Open the Instagram application or website, copy the URL of the photo, video, reels, carousel, IGTV.
            </p>
          </div>
        </div>
        
        {/* Step 2 */}
        <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105">
          <div className="p-6 flex flex-col items-center">
            <div className="w-full h-48 bg-purple-700/40 rounded-lg flex items-center justify-center mb-4 relative">
              <div className="w-4/5 h-12 bg-white/90 rounded-lg flex items-center pl-4 text-gray-500 text-sm">
                instagram.com/p/C...
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
                  Paste
                </div>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <ArrowRightIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Paste the link</h3>
            <p className="text-white/80 text-center text-sm">
              Return to the InstaGrab website, paste the link into the input field and click the &quot;Download&quot; button.
            </p>
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105">
          <div className="p-6 flex flex-col items-center">
            <div className="w-full h-48 bg-purple-700/40 rounded-lg flex items-center justify-center mb-4 relative">
              <div className="w-4/5 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-medium">
                Download
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <ArrowDownTrayIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Download</h3>
            <p className="text-white/80 text-center text-sm">
              Quickly you will get the results with several quality options. Download what fits your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadGuide; 