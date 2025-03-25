import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className="w-full py-6 bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm mt-10">
      <footer className="py-6 max-w-[900px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center justify-center gap-1 text-white/80 text-sm mb-4 sm:mb-0">
            <span>InstaGrab</span>
            <span className="text-pink-300 font-medium">2025</span>
            <HeartIcon className="h-4 w-4 text-pink-300 ml-1" />
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-white/70 hover:text-white text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
        
        <div className="mt-4 text-center text-white/50 text-xs">
          <p>Fast & Easy Instagram Media Downloader</p>
          <p className="mt-1">InstaGrab is not affiliated with Instagram, Facebook, or Meta Platforms, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer; 