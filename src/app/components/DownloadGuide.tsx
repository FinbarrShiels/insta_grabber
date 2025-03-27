'use client';

import React from 'react';
import {
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const DownloadGuide: React.FC = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        How to Download Instagram Content
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm border border-purple-200 flex flex-col items-center text-center">
          <div className="rounded-full bg-purple-100 p-3 mb-4 border border-purple-200">
            <ClipboardDocumentIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-purple-800 mb-2">Copy Link</h3>
          <p className="text-gray-600">
            Find the Instagram content you want to download and copy its URL from the address bar or share menu.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 shadow-sm border border-pink-200 flex flex-col items-center text-center">
          <div className="rounded-full bg-pink-100 p-3 mb-4 border border-pink-200">
            <ArrowPathIcon className="h-8 w-8 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-pink-800 mb-2">Paste URL</h3>
          <p className="text-gray-600">
            Paste the copied link into the URL field at the top of this page and click the download button.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-sm border border-indigo-200 flex flex-col items-center text-center">
          <div className="rounded-full bg-indigo-100 p-3 mb-4 border border-indigo-200">
            <ArrowDownTrayIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Download</h3>
          <p className="text-gray-600">
            Our system will process the content and provide download options. Click to save it to your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadGuide; 