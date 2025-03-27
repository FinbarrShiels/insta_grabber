'use client';

import React from 'react';
import Image from 'next/image';

const FeaturesSection: React.FC = () => {
  return (
    <div className="mb-12">
      {/* Choose InstaGrab section */}
      <div className="mb-10">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 text-center mb-3">
          Choose InstaGrab for download from Instagram
        </h2>
        
        <div className="w-full h-px bg-gray-200 mb-6"></div>
        
        <p className="text-gray-600 text-sm mb-6">
          Downloading videos from Instagram is just two clicks is possible without compromising on quality. Avoid using unreliable alternatives and experience the videos, even if they are of lower quality.
        </p>
        
        {/* Service features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 mb-3">
              <Image 
                src="/images/fast-download.svg" 
                width={40}
                height={40}
                alt="Fast download"
              />
            </div>
            <h3 className="font-semibold text-center mb-1">Fast download</h3>
            <p className="text-sm text-gray-600 text-center">
              Our servers are optimized to provide you with the fastest download speeds.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 mb-3">
              <Image 
                src="/images/all-devices.svg" 
                width={40}
                height={40}
                alt="Support for all devices"
              />
            </div>
            <h3 className="font-semibold text-center mb-1">Support for all devices</h3>
            <p className="text-sm text-gray-600 text-center">
              Whether you are on a mobile, tablet, or desktop, InstaGrab will get you covered.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 mb-3">
              <Image 
                src="/images/high-quality.svg" 
                width={40}
                height={40}
                alt="High quality"
              />
            </div>
            <h3 className="font-semibold text-center mb-1">High quality</h3>
            <p className="text-sm text-gray-600 text-center">
              Download Instagram content in its original quality without any loss.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 mb-3">
              <Image 
                src="/images/security.svg" 
                width={40}
                height={40}
                alt="Security"
              />
            </div>
            <h3 className="font-semibold text-center mb-1">Security</h3>
            <p className="text-sm text-gray-600 text-center">
              We prioritize your privacy. No login required and all downloads are processed securely.
            </p>
          </div>
        </div>
      </div>
      
      {/* InstaGrab features section */}
      <h2 className="text-xl md:text-2xl font-semibold text-blue-600 text-center mb-3">
        InstaGrab features
      </h2>
      
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      
      <p className="text-center text-gray-600 text-sm mb-8">
        With InstaGrab you can download any type of content from Instagram. Our service has an IG video downloader, Reels, photos, stories, and carousel.
      </p>
      
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
                className="rounded object-contain"
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
                className="rounded object-contain"
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
                className="rounded object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
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
                className="rounded object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel / Album Downloader */}
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
                className="rounded object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection; 