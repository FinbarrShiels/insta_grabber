'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { InstagramApiResponse } from '../utils/api';
import { 
  ArrowDownTrayIcon, 
  PhotoIcon, 
  VideoCameraIcon,
  FilmIcon,
  CameraIcon,
  ViewColumnsIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  PlayIcon,
  UserCircleIcon,
  TicketIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

interface ContentResultsProps {
  submittedUrl: string;
  loading: boolean;
  error: string | null;
  data: InstagramApiResponse | null;
  contentType: string;
}

const ContentResults: React.FC<ContentResultsProps> = ({
  submittedUrl,
  loading,
  error,
  data,
  contentType
}) => {
  const [downloadStatus, setDownloadStatus] = useState<Record<string, {
    loading: boolean;
    error: string | null;
    success: boolean;
  }>>({});
  
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Debug log when data changes
  useEffect(() => {
    if (data?.info?.resources) {
      console.log('Resources available:', data.info.resources.length);
      data.info.resources.forEach((resource: any, index: number) => {
        console.log(`Resource ${index}:`, resource.type, resource.url);
        // Log all potential thumbnail sources
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
    
    // Log the raw API response as provided in the example
    if (data) {
      // Cast to any to access potential raw API properties not in the type definition
      const rawData = data as any;
      console.log('Raw API processing check:', {
        thumb: rawData.thumb || 'N/A',
        download_url: rawData.download_url || 'N/A',
        type: rawData.type || 'N/A'
      });
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
  
  const handleDownload = async (url: string, filename: string, resourceId: string = 'main') => {
    try {
      // Update status to loading
      setDownloadStatus(prev => ({
        ...prev,
        [resourceId]: { loading: true, error: null, success: false }
      }));
      
      // Call our server API to download the file
      const response = await axios.post('/api/download', {
        url,
        contentType,
        filename
      });
      
      if (response.data.success && response.data.filePath) {
        // Create a hidden iframe for the download
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `/api/download?filename=${encodeURIComponent(response.data.filename)}`;
        
        // Add to document, wait for download to start, then clean up
        document.body.appendChild(iframe);
        
        // Clean up after a short delay
        setTimeout(() => {
          document.body.removeChild(iframe);
          
          // Update status to success
          setDownloadStatus(prev => ({
            ...prev,
            [resourceId]: { loading: false, error: null, success: true }
          }));
        }, 1000);
      } else {
        throw new Error(response.data.error || 'Failed to prepare download');
      }
    } catch (err) {
      console.error('Download error:', err);
      
      // Update status to error
      setDownloadStatus(prev => ({
        ...prev,
        [resourceId]: { 
          loading: false, 
          error: err instanceof Error ? err.message : 'Failed to download', 
          success: false 
        }
      }));
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => {
          const current = prev[resourceId];
          if (current && current.error) {
            return {
              ...prev,
              [resourceId]: { ...current, error: null }
            };
          }
          return prev;
        });
      }, 3000);
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
      
      {error ? (
        <div className="bg-red-500/20 rounded-lg p-4 mb-4 flex items-center gap-3">
          <ExclamationCircleIcon className="h-6 w-6 text-red-300 flex-shrink-0" />
          <p className="text-sm text-white/90">{error}</p>
        </div>
      ) : data?.info ? (
        <div className="space-y-4" ref={resultsRef}>
          {/* Media Preview */}
          <MediaPreview data={data} />
          
          {/* Caption */}
          {data.info?.caption && (
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-white/80">{data.info.caption}</p>
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

// Display the media previews
const MediaPreview = ({ data }: { data: any }) => {
  const [itemDownloadStatus, setItemDownloadStatus] = useState<Record<number, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  
  // Create a helper function to proxy URLs
  const getProxiedImageUrl = (url: string) => {
    if (!url) return '';
    // Use our proxy endpoint
    return `/api/proxy?url=${encodeURIComponent(url)}`;
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
  };
  
  // Handle video ended
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasStartedPlaying(false);
  };
  
  // Log the API response for debugging
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log('Full API response data:', data);
    }
  }, [data]);

  const onDownload = async (url: string, filename: string, index: number) => {
    try {
      setItemDownloadStatus(prev => ({ ...prev, [index]: true }));
      
      // Use the same download endpoint as the main download button
      const response = await axios.post('/api/download', {
        url,
        filename,
        contentType: data.info.type || 'video'
      });
      
      if (response.data.success && response.data.filePath) {
        // Create a hidden iframe for the download
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `/api/download?filename=${encodeURIComponent(response.data.filename)}`;
        
        // Add to document, wait for download to start, then clean up
        document.body.appendChild(iframe);
        
        // Clean up after a short delay
        setTimeout(() => {
          document.body.removeChild(iframe);
          
          // Reset status after 3 seconds
          setItemDownloadStatus(prev => ({ ...prev, [index]: false }));
        }, 1000);
      } else {
        console.error('Download failed:', response.data);
        setItemDownloadStatus(prev => ({ ...prev, [index]: false }));
      }
    } catch (error) {
      console.error('Download error:', error);
      setItemDownloadStatus(prev => ({ ...prev, [index]: false }));
    }
  };

  useEffect(() => {
    if (data?.info?.resources) {
      console.log('Resources available:', data.info.resources.length);
      data.info.resources.forEach((resource: any, index: number) => {
        console.log(`Resource ${index}:`, resource.type, resource.url);
        // Also log thumbnail URL if available
        if (resource.thumbnail) {
          console.log(`Resource ${index} thumbnail:`, resource.thumbnail);
        }
      });
    } else {
      console.log('No resources found in data:', data);
    }
  }, [data]);

  useEffect(() => {
    // Import react-player dynamically to avoid SSR issues
    import('react-player/lazy');
  }, []);

  if (!data?.info?.resources || data.info.resources.length === 0) {
    return <p className="text-white/80">No media preview available</p>;
  }

  const itemCount = data.info.resources.length;
  const videoItems = data.info.resources.filter((r: any) => r.type === 'video');
  
  // If there are videos, display the video player centered
  if (videoItems.length > 0) {
    // Dynamic import of ReactPlayer to avoid SSR issues
    const ReactPlayer = require('react-player/lazy').default;
    
    const videoResource = selectedVideo !== null 
      ? data.info.resources[selectedVideo] 
      : videoItems[0];
    
    const videoIndex = selectedVideo !== null 
      ? selectedVideo 
      : data.info.resources.findIndex((r: any) => r.type === 'video');

    return (
      <div>
        {/* Video Player Section */}
        <div className="max-w-xs mx-auto mb-8">
          <div className="aspect-[9/16] relative bg-black rounded-lg overflow-hidden shadow-lg">
            {/* Video Player */}
            {videoResource && (
              <div className="relative w-full h-full">
                <ReactPlayer
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
                    {videoResource.thumbnail || videoResource.thumb ? (
                      <img 
                        src={getProxiedImageUrl(videoResource.thumb || videoResource.thumbnail)}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error("Thumbnail failed to load:", videoResource.thumbnail || videoResource.thumb);
                          // Fall back to a placeholder
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M10 8l6 4-6 4V8z'%3E%3C/path%3E%3C/svg%3E";
                          e.currentTarget.className = "w-full h-full object-contain bg-black p-8";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <FilmIcon className="h-16 w-16 text-white/30" />
                      </div>
                    )}
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
              onClick={() => onDownload(
                videoResource.url, 
                `instagram-video-${data.info.shortcode || 'download'}.mp4`, 
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
              {videoItems.map((resource: any, index: number) => {
                const resourceIndex = data.info.resources.findIndex((r: any) => r === resource);
                return (
                  <div 
                    key={index} 
                    className={`aspect-[9/16] relative bg-black/40 rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedVideo === resourceIndex ? 'border-pink-500' : 'border-transparent'
                    }`}
                    onClick={() => handleVideoClick(resourceIndex)}
                  >
                    {resource.thumbnail || resource.thumb ? (
                      <img 
                        src={getProxiedImageUrl(resource.thumb || resource.thumbnail)}
                        alt={`Video thumbnail ${index}`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        onError={(e) => {
                          console.error("Thumbnail failed to load:", resource.thumbnail || resource.thumb);
                          // Fall back to a placeholder
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M10 8l6 4-6 4V8z'%3E%3C/path%3E%3C/svg%3E";
                          e.currentTarget.className = "w-full h-full object-contain bg-black p-4";
                        }}
                      />
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
        {data.info.resources.some((r: any) => r.type !== 'video') && (
          <div className="mt-8">
            <h3 className="text-white/90 text-sm font-medium mb-3">Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.info.resources
                .filter((r: any) => r.type !== 'video')
                .map((resource: any, index: number) => {
                  const resourceIndex = data.info.resources.findIndex((r: any) => r === resource);
                  return (
                    <div key={index} className="overflow-hidden border border-white/20 rounded-md shadow-md bg-black/20">
                      <div className="relative h-60 w-full">
                        {resource.url ? (
                          <img
                            src={resource.url}
                            alt={`Content preview ${index + 1}`}
                            className="object-cover w-full h-full"
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
                          onClick={() => onDownload(
                            resource.url, 
                            `instagram-${data.info.shortcode || 'item'}-${index + 1}.jpg`,
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
              data.info.resources.forEach((resource: any, index: number) => {
                setTimeout(() => {
                  if (resource.url) {
                    onDownload(
                      resource.url,
                      `instagram-album-${data.info.shortcode || 'download'}-${index + 1}.${resource.type === 'video' ? 'mp4' : 'jpg'}`,
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
        {data.info.resources.map((resource: any, index: number) => (
          <div key={index} className="overflow-hidden border border-white/20 rounded-md shadow-md bg-black/20">
            <div className="p-0">
              {resource.type === 'video' ? (
                <div 
                  className="aspect-[9/16] relative bg-black rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleVideoClick(index)}
                >
                  {resource.thumbnail || resource.thumb ? (
                    <img 
                      src={getProxiedImageUrl(resource.thumb || resource.thumbnail)}
                      alt="Video thumbnail"
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={(e) => {
                        console.error("Thumbnail failed to load:", resource.thumbnail || resource.thumb);
                        // Fall back to a placeholder
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'%3E%3C/path%3E%3Cpath d='M10 8l6 4-6 4V8z'%3E%3C/path%3E%3C/svg%3E";
                        e.currentTarget.className = "w-full h-full object-contain bg-black p-4";
                      }}
                    />
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
                    <img
                      src={resource.url}
                      alt={`Content preview ${index + 1}`}
                      className="object-cover w-full h-full"
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
                onClick={() => onDownload(
                  resource.url, 
                  `instagram-${data.info.shortcode || 'item'}-${index + 1}.${resource.type === 'video' ? 'mp4' : 'jpg'}`,
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