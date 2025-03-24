'use client';

import React from 'react';
import Image from 'next/image';
import { 
  VideoCameraIcon, 
  PhotoIcon, 
  FilmIcon, 
  ViewColumnsIcon 
} from '@heroicons/react/24/outline';

const FeaturesSection: React.FC = () => {
  return (
    <section className="mt-14 mb-16">
      <h2 className="text-center text-3xl font-bold text-white mb-6">
        InstaGrab Features
      </h2>
      
      <p className="text-center text-white/80 mb-10 max-w-3xl mx-auto">
        With InstaGrab you can download any type of content from Instagram. Our service has an IG video downloader, Reels, IGTV, photo or carousel.
      </p>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Video Downloader */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <VideoCameraIcon className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">Video Downloader</h3>
              </div>
              <p className="text-white/80 mb-4">
                InstaGrab supports Instagram video download for singular videos and 
                multiple videos from carousels. InstaGrab is created to enable you to 
                download IG videos from your personal page.
              </p>
            </div>
            <div className="md:w-1/3 relative aspect-square rounded-lg overflow-hidden bg-purple-900/30 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <VideoCameraIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Photos Downloader */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <PhotoIcon className="h-6 w-6 text-pink-400" />
                <h3 className="text-xl font-bold text-pink-400">Photos Downloader</h3>
              </div>
              <p className="text-white/80 mb-4">
                Instagram photo download provided by InstaGrab is a great tool for saving
                images from Instagram posts. With InstaGrab, you can download a single
                post image and multiple Instagram photos (carousel).
              </p>
            </div>
            <div className="md:w-1/3 relative aspect-square rounded-lg overflow-hidden bg-purple-900/30 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <PhotoIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reels Downloader */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <FilmIcon className="h-6 w-6 text-orange-400" />
                <h3 className="text-xl font-bold text-orange-400">Reels Downloader</h3>
              </div>
              <p className="text-white/80 mb-4">
                Reels is a new video format that clones the principle of TikTok.
                Instagram Reels download with the help of InstaGrab. Our Instagram Reels
                downloader can help you to save your favorite Reels videos.
              </p>
            </div>
            <div className="md:w-1/3 relative aspect-square rounded-lg overflow-hidden bg-purple-900/30 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <FilmIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel/Album Downloader */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ViewColumnsIcon className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Carousel / Album Downloader</h3>
              </div>
              <p className="text-white/80 mb-4">
                Carousel, also known as Album or Gallery post type with multiple 
                photos, videos, or mixed content. If you need to download multiple
                photos from Instagram, the InstaGrab is the best to download gallery.
              </p>
            </div>
            <div className="md:w-1/3 relative aspect-square rounded-lg overflow-hidden bg-purple-900/30 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <ViewColumnsIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 