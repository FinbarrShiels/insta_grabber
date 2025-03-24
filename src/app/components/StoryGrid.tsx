'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  PlayIcon, 
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player';

// Dynamically import ReactPlayer to avoid SSR issues
const DynamicReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface Resource {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface StoryGridProps {
  resources: Resource[];
  onDownload: (url: string, index: number) => void;
}

const StoryGrid: React.FC<StoryGridProps> = ({ resources, onDownload }) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<Record<number, boolean>>({});
  const playerRefs = useRef<(ReactPlayer | null)[]>([]);

  // Initialize refs array when resources change
  useEffect(() => {
    playerRefs.current = resources.map(() => null);
  }, [resources]);

  // Handle video click
  const handleVideoClick = (index: number) => {
    // If clicking the currently playing video, pause it
    if (playingIndex === index) {
      setPlayingIndex(null);
    } else {
      // If another video is playing, pause it first
      if (playingIndex !== null && playerRefs.current[playingIndex]) {
        playerRefs.current[playingIndex].getInternalPlayer().pause();
      }
      // Play the clicked video
      setPlayingIndex(index);
    }
  };

  // Create a helper function to proxy URLs
  const getProxiedImageUrl = (url: string | undefined) => {
    if (!url) return '';
    // Use our proxy endpoint
    return `/api/proxy?url=${encodeURIComponent(url)}`;
  };

  // Handle download button click
  const handleDownloadClick = (url: string, index: number) => {
    setDownloadStatus(prev => ({ ...prev, [index]: true }));
    onDownload(url, index);
    // Reset download status after 2 seconds
    setTimeout(() => {
      setDownloadStatus(prev => ({ ...prev, [index]: false }));
    }, 2000);
  };

  return (
    <div className="bg-white/10 rounded-lg p-4">
      <h3 className="text-xl font-semibold text-white mb-4">Story Media</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <div 
            key={index} 
            className="relative rounded-lg overflow-hidden bg-black/20 aspect-[9/16]"
          >
            {/* Video Player */}
            {resource.type === 'video' && (
              <>
                {playingIndex === index ? (
                  <div className="w-full h-full">
                    <DynamicReactPlayer
                      ref={(el: ReactPlayer | null) => playerRefs.current[index] = el}
                      url={resource.url}
                      width="100%"
                      height="100%"
                      playing={playingIndex === index}
                      controls={true}
                      onPause={() => setPlayingIndex(null)}
                      onEnded={() => setPlayingIndex(null)}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                            disablePictureInPicture: true,
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div 
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => handleVideoClick(index)}
                  >
                    {/* Thumbnail */}
                    <div className="absolute inset-0">
                      <Image
                        src={getProxiedImageUrl(resource.thumbnail)}
                        alt={`Video thumbnail ${index}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/50 p-4">
                        <PlayIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Download Button */}
                <button
                  onClick={() => handleDownloadClick(resource.url, index)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  title="Download video"
                >
                  {downloadStatus[index] ? (
                    <div className="h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowDownTrayIcon className="h-5 w-5 text-purple-600" />
                  )}
                </button>
              </>
            )}
            
            {/* Image Display */}
            {resource.type === 'image' && (
              <div className="relative w-full h-full">
                <Image
                  src={getProxiedImageUrl(resource.url)}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Download Button */}
                <button
                  onClick={() => handleDownloadClick(resource.url, index)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  title="Download image"
                >
                  {downloadStatus[index] ? (
                    <div className="h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowDownTrayIcon className="h-5 w-5 text-purple-600" />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryGrid; 