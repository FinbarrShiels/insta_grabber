// API endpoint for Instagram content
const API_ENDPOINT = '/api/instagram';

// Types for the new API response format
export interface InstagramMediaResponse {
  error: boolean;
  hosting: string;
  shortcode: string;
  caption: string;
  type: string;
  download_url: string;
  thumb: string;
  media?: {
    url: string;
    type: string;
  }[];
}

// Types for the API response based on the provided endpoint
export interface InstagramApiResponse {
  status: string;
  message?: string;
  error?: string;
  info?: {
    id: string;
    type: string;
    shortcode: string;
    caption?: string;
    owner?: {
      id: string;
      username: string;
      full_name: string;
    };
    created_at_utc?: string;
    resources?: {
      type: string;
      url: string;
      thumbnail?: string;
      thumb?: string;
      quality?: string;
    }[];
  };
  // Raw API properties for access if needed
  thumb?: string;
  download_url?: string;
  type?: string;
}

// Function to extract Instagram URL
export const sanitizeInstagramUrl = (url: string): string => {
  // Trim and ensure it has protocol
  let sanitizedUrl = url.trim();
  
  // Add https:// if missing
  if (!sanitizedUrl.startsWith('http')) {
    sanitizedUrl = `https://${sanitizedUrl}`;
  }
  
  // Ensure it's an Instagram URL
  if (!sanitizedUrl.includes('instagram.com')) {
    if (sanitizedUrl.includes('instagr.am')) {
      // Convert instagr.am to instagram.com
      sanitizedUrl = sanitizedUrl.replace('instagr.am', 'instagram.com');
    } else {
      // Assume it's a shortcode and construct a default URL
      sanitizedUrl = `https://www.instagram.com/p/${sanitizedUrl}`;
    }
  }
  
  return sanitizedUrl;
};

// Function to fetch Instagram content
export const fetchInstagramContent = async (url: string): Promise<InstagramApiResponse> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch content');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Instagram content:', error);
    throw error;
  }
};

// Function to get proxied image URL
export const getProxiedImageUrl = (url: string): string => {
  return `/api/proxy?url=${encodeURIComponent(url)}`;
};

// Content type detection
export const getContentType = (info?: InstagramApiResponse['info']): string => {
  if (!info) return 'unknown';
  
  // First check the top-level type property
  if (info.type) {
    switch (info.type) {
      case 'carousel':
      case 'carousel_album':
        return 'carousel';
      case 'image':
      case 'photo':
        return 'photo';
      case 'video':
        return 'video';
      case 'reel':
        return 'reel';
      case 'story':
        return 'story';
      default:
        // If type doesn't match these, check the URL
        break;
    }
  }
  
  // If resources exist, check the first one's type
  if (info.resources && info.resources.length > 0) {
    if (info.resources.length > 1) {
      return 'carousel';
    }
    return info.resources[0].type;
  }
  
  // If we can't determine, use URL to guess
  if (info.shortcode) {
    // Try to determine from shortcode URL structure
    const url = `https://instagram.com/p/${info.shortcode}`;
    if (url.includes('/reel/')) {
      return 'reel';
    } else if (url.includes('/stories/')) {
      return 'story';
    }
  }
  
  return 'unknown';
};

// Function to generate a unique filename for temporary storage
export const generateTempFilename = (contentType: string, shortcode: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = contentType === 'video' || contentType === 'reel' ? 'mp4' : 'jpg';
  
  return `instagram-${contentType}-${shortcode}-${timestamp}-${randomStr}.${extension}`;
};

// Export all API functions
export const api = {
  fetchInstagramContent,
  getContentType,
  sanitizeInstagramUrl,
  generateTempFilename,
  getProxiedImageUrl
};

export default api; 