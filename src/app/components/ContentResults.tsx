'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ArrowDownTrayIcon, 
  PhotoIcon, 
  VideoCameraIcon,
  FilmIcon,
  CameraIcon,
  ViewColumnsIcon,
  ExclamationCircleIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player';

// Dynamically import ReactPlayer to avoid SSR issues
const DynamicReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface Resource {
  type: 'image' | 'video';
  url: string;
  thumb?: string;
  thumbnail?: string;
}

interface ContentInfo {
  title: string;
  description: string;
  resources: Resource[];
  owner?: {
    username: string;
    full_name: string;
  };
  created_at_utc?: string;
}

interface ContentData {
  info: ContentInfo;
  error?: string;
}

interface ContentResultsProps {
  submittedUrl: string;
  loading: boolean;
  error: string | null;
  data: ContentData | null;
  contentType: string;
}

const ContentResults: React.FC<ContentResultsProps> = ({
  submittedUrl,
  loading,
  error: propsError,
  data,
  contentType
}) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (data?.info?.resources) {
      console.log('Resources available:', data.info.resources.length);
      data.info.resources.forEach((resource: Resource, index: number) => {
        console.log(`Resource ${index}:`, resource.type, resource.url);
        console.log(`Resource ${index} thumbnails:`, {
          thumbnail: resource.thumbnail || 'none',
          thumb: resource.thumb || 'none'
        });
      });
      
      // Scroll to results when content is found
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    } else {
      console.log('No resources found in data:', data);
    }
  }, [data]);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'photo':
      case 'image':
        return <PhotoIcon className="h-3.5 w-3.5" />;
      case 'video':
        return <VideoCameraIcon className="h-3.5 w-3.5" />;
      case 'reel':
        return <FilmIcon className="h-3.5 w-3.5" />;
      case 'story':
        return <CameraIcon className="h-3.5 w-3.5" />;
      case 'carousel':
        return <ViewColumnsIcon className="h-3.5 w-3.5" />;
      default:
        return <PhotoIcon className="h-3.5 w-3.5" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[900px] mx-auto flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-200 mb-4"></div>
        <p className="text-white/80">Fetching content from Instagram...</p>
      </div>
    );
  }
  
  if (!submittedUrl) {
    return null;
  }
  
  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Download Results</h2>
        <div className="flex items-center gap-1.5 text-xs text-pink-200 bg-pink-200/20 px-3 py-1.5 rounded-full">
          {getContentIcon(contentType)}
          <span>{contentType.toUpperCase()}</span>
        </div>
      </div>
      
      {propsError ? (
        <div className="bg-red-500/20 rounded-lg p-4 mb-4 flex items-center gap-3">
          <ExclamationCircleIcon className="h-6 w-6 text-red-300 flex-shrink-0" />
          <p className="text-sm text-white/90">{propsError}</p>
        </div>
      ) : data?.info ? (
        <div className="space-y-4" ref={resultsRef}>
          {/* Media Preview */}
          <MediaPreview data={data.info} />
          
          {/* Caption */}
          {data.info?.description && (
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-white/80">{data.info.description}</p>
            </div>
          )}
          
          {/* User info if available */}
          {data.info?.owner && (
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-xs text-white/60 mb-1">Posted by</p>
              <p className="text-sm text-white/80">{data.info.owner.full_name} (@{data.info.owner.username})</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-sm text-white/80 break-all">{submittedUrl}</p>
        </div>
      )}
    </div>
  );
};

const MediaPreview: React.FC<{ data: ContentInfo }> = ({ data }) => {
  const [itemDownloadStatus, setItemDownloadStatus] = useState<Record<number, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  
  // Create a helper function to proxy URLs
  const getProxiedImageUrl = (url: string | undefined) => {
    if (!url) return '';
    // Use our proxy endpoint
    return `/api/proxy?url=${encodeURIComponent(url)}`;
  };

  // Replace img tags with Next.js Image component
  const renderThumbnail = (url: string | undefined, alt: string) => {
    if (!url) {
      return (
        <div className="flex items-center justify-center h-full">
          <FilmIcon className="h-8 w-8 text-white/50" />
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <Image
          src={getProxiedImageUrl(url)}
          alt={alt}
          fill
          className="object-cover"
          onError={(e) => {
            console.error("Thumbnail failed to load:", url);
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M10 8l6 4-6 4V8z'%3E%3C/path%3E%3C/svg%3E";
            target.className = "w-full h-full object-contain bg-black p-4";
          }}
        />
      </div>
    );
  };

  // Handle video click
  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
    setIsPlaying(true);
    setHasStartedPlaying(true);
  };
  
  // Handle video pause
  const handleVideoPause = () => {
    setIsPlaying(false);
  };
  
  // Handle video play
  const handleVideoPlay = () => {
    setIsPlaying(true);
    setHasStartedPlaying(true);
  };
  
  // Handle video ended
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasStartedPlaying(false);
  };

  const handleDownload = async (url: string, filename: string, index: number) => {
    try {
      setItemDownloadStatus(prev => ({ ...prev, [index]: true }));
      
      // Fetch the video file
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch video');
      
      // Convert the response to a blob
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'code.mp4'; // Use code.mp4 as default filename
      
      // Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download video. Please try again.');
    } finally {
      setItemDownloadStatus(prev => ({ ...prev, [index]: false }));
    }
  };

  if (!data?.resources || data.resources.length === 0) {
    return <p className="text-white/80">No media preview available</p>;
  }

  const itemCount = data.resources.length;
  const videoItems = data.resources.filter((r: Resource) => r.type === 'video');
  
  // If there are videos, display the video player centered
  if (videoItems.length > 0) {
    const videoResource = selectedVideo !== null 
      ? data.resources[selectedVideo] 
      : videoItems[0];
    
    const videoIndex = selectedVideo !== null 
      ? selectedVideo 
      : data.resources.findIndex((r: Resource) => r.type === 'video');

    return (
      <div>
        {/* Video Player Section */}
        <div className="max-w-xs mx-auto mb-8">
          <div className="aspect-[9/16] relative bg-black rounded-lg overflow-hidden shadow-lg">
            {/* Video Player */}
            {videoResource && (
              <div className="relative w-full h-full">
                <DynamicReactPlayer
                  ref={playerRef}
                  url={videoResource.url}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls={false}
                  onEnded={handleVideoEnded}
                  playsinline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                        poster: getProxiedImageUrl(videoResource.thumb || videoResource.thumbnail) || '',
                        style: { objectFit: 'contain', background: 'black' }
                      }
                    }
                  }}
                />
                
                {/* Play button overlay (only shown when video is not playing or hasn't started) */}
                {!isPlaying && !hasStartedPlaying && (
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onClick={handleVideoPlay}
                  >
                    {renderThumbnail(videoResource.thumb || videoResource.thumbnail, "Video thumbnail")}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-20 w-20 rounded-full bg-purple-600/70 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Pause/Play button overlay */}
                {hasStartedPlaying && (
                  <div 
                    className="absolute inset-0 cursor-pointer z-10 bg-black/10 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center"
                    onClick={isPlaying ? handleVideoPause : handleVideoPlay}
                  >
                    <div className="h-20 w-20 rounded-full bg-purple-600/70 hover:bg-purple-600/90 transition-colors flex items-center justify-center">
                      {isPlaying ? (
                        <PauseIcon className="h-12 w-12 text-white" />
                      ) : (
                        <PlayIcon className="h-12 w-12 text-white" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Download Button */}
          <div className="mt-4 flex justify-center">
            <button 
              className={`px-6 py-3 text-base font-medium rounded-lg ${
                itemDownloadStatus[videoIndex] 
                  ? 'bg-green-600' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white flex items-center gap-2 shadow-md`}
              onClick={() => handleDownload(
                videoResource.url, 
                `instagram-video-${data.title || 'download'}.mp4`, 
                videoIndex
              )}
              disabled={itemDownloadStatus[videoIndex]}
            >
              {itemDownloadStatus[videoIndex] ? (
                <>
                  <span className="h-3 w-3 rounded-full bg-white animate-pulse mr-1"></span>
                  Downloading...
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Download Video
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Video Thumbnails List (if multiple videos) */}
        {videoItems.length > 1 && (
          <div className="mt-6">
            <h3 className="text-white/90 text-sm font-medium mb-3">All Videos ({videoItems.length})</h3>
            <div className="grid grid-cols-3 gap-3">
              {videoItems.map((resource: Resource, index: number) => {
                const resourceIndex = data.resources.findIndex((r: Resource) => r === resource);
                return (
                  <div 
                    key={index} 
                    className={`aspect-[9/16] relative bg-black/40 rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedVideo === resourceIndex ? 'border-pink-500' : 'border-transparent'
                    }`}
                    onClick={() => handleVideoClick(resourceIndex)}
                  >
                    {resource.thumbnail || resource.thumb ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={getProxiedImageUrl(resource.thumb || resource.thumbnail) || ''}
                          alt={`Video thumbnail ${index}`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            console.error("Thumbnail failed to load:", resource.thumbnail || resource.thumb);
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M10 8l6 4-6 4V8z'%3E%3C/path%3E%3C/svg%3E";
                            target.className = "w-full h-full object-contain bg-black p-4";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FilmIcon className="h-8 w-8 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-purple-600/70 flex items-center justify-center transform transition-transform hover:scale-110">
                        <PlayIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Image Resources */}
        {data.resources.some((r: Resource) => r.type !== 'video') && (
          <div className="mt-8">
            <h3 className="text-white/90 text-sm font-medium mb-3">Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.resources
                .filter((r: Resource) => r.type !== 'video')
                .map((resource: Resource, index: number) => {
                  const resourceIndex = data.resources.findIndex((r: Resource) => r === resource);
                  return (
                    <div key={index} className="overflow-hidden border border-white/20 rounded-md shadow-md bg-black/20">
                      <div className="relative h-60 w-full">
                        {resource.url ? (
                          <Image
                            src={resource.url}
                            alt={`Content preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <p className="p-4 text-center text-white/50">Image preview not available</p>
                        )}
                      </div>
                      <div className="p-3 flex justify-between">
                        <button
                          className="px-3 py-1 text-sm border border-white/10 text-white/80 rounded-md hover:bg-white/5"
                          onClick={() => window.open(resource.url, '_blank')}
                          disabled={!resource.url}
                        >
                          Open
                        </button>
                        <button 
                          className={`px-3 py-1 text-sm ${itemDownloadStatus[resourceIndex] ? 
                            'bg-green-600' : 'bg-purple-600'} text-white rounded-md hover:bg-purple-700 flex items-center gap-1`}
                          onClick={() => handleDownload(
                            resource.url, 
                            `instagram-${data.title || 'item'}-${index + 1}.jpg`,
                            resourceIndex
                          )}
                          disabled={!resource.url || itemDownloadStatus[resourceIndex]}
                        >
                          {itemDownloadStatus[resourceIndex] ? (
                            <>
                              <span className="h-3 w-3 rounded-full bg-white animate-pulse mr-1"></span>
                              Downloading...
                            </>
                          ) : (
                            <>
                              <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1" />
                              Download
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // For photo-only content, display the grid layout
  return (
    <div>
      {itemCount > 1 && (
        <div className="mb-3 flex justify-between items-center">
          <p className="text-sm text-white/70 flex items-center gap-1.5">
            <ViewColumnsIcon className="h-4 w-4" />
            Album with {itemCount} items
          </p>
          <button 
            className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-1"
            onClick={() => {
              // Download each item with a slight delay to prevent browser limits
              data.resources.forEach((resource: Resource, index: number) => {
                setTimeout(() => {
                  if (resource.url) {
                    handleDownload(
                      resource.url,
                      `instagram-album-${data.title || 'download'}-${index + 1}.${resource.type === 'video' ? 'mp4' : 'jpg'}`,
                      index
                    );
                  }
                }, index * 1000); // 1 second delay between downloads
              });
            }}
          >
            <ArrowDownTrayIcon className="h-3.5 w-3.5" />
            Download All
          </button>
        </div>
      )}
      
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data.resources.map((resource: Resource, index: number) => (
          <div key={index} className="overflow-hidden border border-white/20 rounded-md shadow-md bg-black/20">
            <div className="p-0">
              {resource.type === 'video' ? (
                <div 
                  className="aspect-[9/16] relative bg-black rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleVideoClick(index)}
                >
                  {resource.thumbnail || resource.thumb ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={getProxiedImageUrl(resource.thumb || resource.thumbnail) || ''}
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          console.error("Thumbnail failed to load:", resource.thumbnail || resource.thumb);
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M10 8l6 4-6 4V8z'%3E%3C/path%3E%3C/svg%3E";
                          target.className = "w-full h-full object-contain bg-black p-4";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FilmIcon className="h-12 w-12 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-purple-600/70 flex items-center justify-center transform transition-transform hover:scale-110">
                      <PlayIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                resource.url ? (
                  <div className="relative h-60 w-full">
                    <Image
                      src={resource.url}
                      alt={`Content preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <p className="p-4 text-center text-white/50">Image preview not available</p>
                )
              )}
            </div>
            <div className="p-3 flex justify-between">
              <button
                className="px-3 py-1 text-sm border border-white/10 text-white/80 rounded-md hover:bg-white/5"
                onClick={() => window.open(resource.url, '_blank')}
                disabled={!resource.url}
              >
                Open
              </button>
              <button 
                className={`px-3 py-1 text-sm ${itemDownloadStatus[index] ? 
                  'bg-green-600' : 'bg-purple-600'} text-white rounded-md hover:bg-purple-700 flex items-center gap-1`}
                onClick={() => handleDownload(
                  resource.url, 
                  `instagram-${data.title || 'item'}-${index + 1}.${resource.type === 'video' ? 'mp4' : 'jpg'}`,
                  index
                )}
                disabled={!resource.url || itemDownloadStatus[index]}
              >
                {itemDownloadStatus[index] ? (
                  <>
                    <span className="h-3 w-3 rounded-full bg-white animate-pulse mr-1"></span>
                    Downloading...
                  </>
                ) : (
                  <>
                    <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1" />
                    Download
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentResults; 