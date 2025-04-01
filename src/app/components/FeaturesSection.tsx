'use client';

import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface FeatureItem {
  title: string;
  description: string;
  image: string;
}

const FeaturesSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: "Photo Downloader",
      description: "Instagram photo download provided by InstaGrab is a great tool for saving images from Instagram posts. With InstaGrab, you can download a single post image and multiple Instagram photos (carousel).",
      image: "/images/photo.png"
    },
    {
      title: "Video Downloader",
      description: "InstaGrab supports Instagram video download for singular videos and multiple videos from carousels. InstaGrab is created to enable you to download IG videos from your personal page.",
      image: "/images/video.png"
    },
    {
      title: "Reels Downloader",
      description: "Reels is a relatively new feature on Instagram, and you can download Instagram Reels with the help of InstaGrab. Our Instagram Reels downloader can help you to save your favorite Reels videos.",
      image: "/images/reels.png"
    },
    {
      title: "Story Downloader",
      description: "Instagram Stories disappear after 24 hours, but with InstaGrab you can download and save Stories before they expire. Our Story downloader helps you preserve these temporary moments to enjoy them later.",
      image: "/images/story.png"
    },
    {
      title: "Carousel Downloader",
      description: "Carousel, also known as album or gallery posts have multiple photos, videos, or mixed content. If you need to download multiple photos from Instagram, the InstaGrab is the best to download gallery posts in high quality.",
      image: "/images/carousel.png"
    }
  ];

  return (
    <div className="w-full py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
        InstaGrab Features
      </h2>
      
      <div className="space-y-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                        items-center max-w-[984px] mx-auto bg-white/10 backdrop-blur-sm 
                        rounded-xl overflow-hidden shadow-lg border border-white/10 mb-8 md:h-[250px]`}
          >
            {/* Image section */}
            <div className="w-full md:w-2/5 p-0 h-64 md:h-full">
              <div className="bg-gradient-to-br from-purple-800/70 to-pink-800/70 h-full w-full flex items-center justify-center">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-contain md:object-cover p-0"
                  loading="lazy"
                />
                {index === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Content section */}
            <div className="w-full md:w-3/5 p-4 md:p-6 h-auto md:h-full overflow-auto">
              <h3 className="text-2xl md:text-4xl font-bold text-[#2dd4bf] mb-2">
                {feature.title}
              </h3>
              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Horizontal divider */}
      <div className="divider mt-12"></div>
    </div>
  );
};

export default FeaturesSection; 