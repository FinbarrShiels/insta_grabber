import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer: React.FC = () => {
  return (
    <div className="w-full">
      <footer className="py-6 text-center max-w-[900px] mx-auto px-4">
        <div className="flex items-center justify-center gap-1 text-white/80 text-sm">
          <span>InstaGrab</span>
          <span className="text-pink-300 font-medium">2025</span>
          <HeartIcon className="h-4 w-4 text-pink-300 ml-1" />
        </div>
        <div className="mt-2 text-white/50 text-xs">
          <p>Fast & Easy Instagram Media Downloader</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer; 