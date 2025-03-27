'use client';

import React from 'react';
import { 
  VideoCameraIcon, 
  PhotoIcon, 
  FilmIcon, 
  ViewColumnsIcon 
} from '@heroicons/react/24/outline';
import Image from 'next/image';

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Video Downloader</h3>
              <p className="text-sm text-gray-600 mb-4">
                InstaGrab supports Instagram video download for regular videos and multiple videos from carousels. InstaGrab is created to enable you to download IG videos from your preferred page.
              </p>
            </div>
            <div className="md:w-1/3 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="relative w-full h-32 md:h-full">
                <Image 
                  src="/images/video-downloader.svg" 
                  alt="Video Downloader"
                  className="rounded object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Photos Downloader */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Photos Downloader</h3>
              <p className="text-sm text-gray-600 mb-4">
                Instagram photo download provided by InstaGrab is a great tool for saving images from Instagram posts. With InstaGrab, you can download a single image or all images from a carousel in original high resolution.
              </p>
            </div>
            <div className="md:w-1/3 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="relative w-full h-32 md:h-full">
                <Image 
                  src="/images/photo-downloader.svg" 
                  alt="Photos Downloader"
                  className="rounded object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Reels Downloader */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Reels Downloader</h3>
              <p className="text-sm text-gray-600 mb-4">
                Reels is a relatively new feature on Instagram, and you can download Instagram Reels with the help of InstaGrab. Our Instagram Reels downloader can help you to save your favorite Reels videos.
              </p>
            </div>
            <div className="md:w-1/3 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="relative w-full h-32 md:h-full">
                <Image 
                  src="/images/reels-downloader.svg" 
                  alt="Reels Downloader"
                  className="rounded object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Story Downloader (replacing IGTV) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Story Downloader</h3>
              <p className="text-sm text-gray-600 mb-4">
                Instagram Stories disappear after 24 hours, but with InstaGrab you can download and save Stories before they expire. Our Story downloader helps you preserve these temporary moments to enjoy them later.
              </p>
            </div>
            <div className="md:w-1/3 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="relative w-full h-32 md:h-full">
                <Image 
                  src="/images/story-downloader.svg" 
                  alt="Story Downloader"
                  className="rounded object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel/Album Downloader */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Carousel / Album Downloader</h3>
              <p className="text-sm text-gray-600 mb-4">
                Carousel, also known as album or gallery posts have multiple photos, videos, or mixed content. If you need to download multiple photos from Instagram, the InstaGrab is the best to download gallery posts in high quality.
              </p>
            </div>
            <div className="md:w-1/3 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center p-4">
              <div className="relative w-full h-32 md:h-full">
                <Image 
                  src="/images/carousel-downloader.svg" 
                  alt="Carousel / Album Downloader"
                  className="rounded object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 