import { NextResponse } from 'next/server';

const API_KEY = process.env.INSTAGRAM_API_KEY;
const API_HOST = process.env.INSTAGRAM_API_HOST || 'save-insta1.p.rapidapi.com';
const API_ENDPOINT = 'https://save-insta1.p.rapidapi.com/media';

// Define the resource interface
interface Resource {
  type: string;
  url: string;
  thumbnail?: string;
  thumb?: string;
}

// Define the new API response interface based on the actual response format
interface SaveInstaResponse {
  result: (StoryItem | RegularItem)[];
  success: boolean;
  message: string;
}

// Regular post item format
interface RegularItem {
  urls: {
    url: string;
    name: string;
    extension: string;
  }[];
  meta: {
    title: string;
    sourceUrl: string;
    shortcode: string;
    commentCount: number;
    likeCount: number;
    takenAt: number;
    comments: {
      text: string;
      username: string;
    }[];
  };
  pictureUrl: string;
  pictureUrlWrapped: string;
  service: string;
}

// Story item format
interface StoryItem {
  image_versions2: {
    candidates: {
      width: number;
      height: number;
      url: string;
      url_wrapped?: string;
    }[];
  };
  original_height: number;
  original_width: number;
  pk: string;
  taken_at: number;
  video_versions: {
    height: number;
    type: number;
    url: string;
    width: number;
    url_wrapped?: string;
  }[];
  has_audio: boolean;
}

// Function to sanitize Instagram URLs
function sanitizeInstagramUrl(url: string): string {
  let sanitizedUrl = url.trim();
  
  // Ensure URL has a protocol
  if (!sanitizedUrl.startsWith('http://') && !sanitizedUrl.startsWith('https://')) {
    sanitizedUrl = 'https://' + sanitizedUrl;
  }
  
  // Convert http to https
  if (sanitizedUrl.startsWith('http://')) {
    sanitizedUrl = 'https://' + sanitizedUrl.substring(7);
  }
  
  // Check if it's a story URL
  const isStoryUrl = sanitizedUrl.includes('/stories/');
  
  // For non-story URLs, remove query parameters
  if (!isStoryUrl) {
    const queryParamIndex = sanitizedUrl.indexOf('?');
    if (queryParamIndex !== -1) {
      sanitizedUrl = sanitizedUrl.substring(0, queryParamIndex);
    }
  }
  
  // Remove trailing slash if not a story URL
  if (!isStoryUrl && sanitizedUrl.endsWith('/')) {
    sanitizedUrl = sanitizedUrl.slice(0, -1);
  }
  
  return sanitizedUrl;
}

export async function POST(request: Request) {
  console.log('Instagram API route handler called');
  
  // Check if API key is configured
  if (!API_KEY) {
    console.error('INSTAGRAM_API_KEY not configured');
    return NextResponse.json(
      { status: 'error', error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    // Get URL from request body
    const body = await request.json();
    const { url } = body;
    
    console.log('Received URL:', url);
    
    if (!url) {
      console.error('No URL provided');
      return NextResponse.json(
        { status: 'error', error: 'URL is required' },
        { status: 400 }
      );
    }

    // Sanitize the URL (remove tracking parameters, ensure https, etc.)
    const sanitizedUrl = sanitizeInstagramUrl(url);
    console.log('Sanitized URL:', sanitizedUrl);
    
    // Call the Instagram API
    const apiUrl = API_ENDPOINT;
    console.log('Calling API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: sanitizedUrl
      })
    });
    
    console.log('API response status:', response.status);
    console.log('API response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { status: 'error', error: errorData.message || 'API request failed' },
          { status: response.status }
        );
      } catch {
        // No parameter needed since we're not using the error
        return NextResponse.json(
          { status: 'error', error: `API request failed with status ${response.status}` },
          { status: response.status }
        );
      }
    }
    
    const responseData: SaveInstaResponse = await response.json();
    console.log('API response data:', JSON.stringify(responseData));
    
    if (!responseData.success) {
      return NextResponse.json(
        { status: 'error', error: responseData.message || 'Failed to fetch Instagram content' },
        { status: 400 }
      );
    }
    
    if (!responseData.result || responseData.result.length === 0) {
      return NextResponse.json(
        { status: 'error', error: 'No media found in the response' },
        { status: 400 }
      );
    }

    // Transform the response to match our application's expected format
    const resources: Resource[] = [];
    const isStory = sanitizedUrl.includes('/stories/');
    
    // Helper function to check if an item is a StoryItem
    function isStoryItem(item: StoryItem | RegularItem): item is StoryItem {
      return 'video_versions' in item;
    }

    // Helper function to check if an item is a RegularItem
    function isRegularItem(item: StoryItem | RegularItem): item is RegularItem {
      return 'urls' in item;
    }

    // Handle case when it's a story (has video_versions) or normal post
    for (const mediaItem of responseData.result) {
      // Check if it's a story format with video_versions
      if (isStory && isStoryItem(mediaItem) && mediaItem.video_versions && mediaItem.video_versions.length > 0) {
        // For story videos
        resources.push({
          type: 'video',
          url: mediaItem.video_versions[0].url,
          thumbnail: mediaItem.image_versions2?.candidates?.[0]?.url || ''
        });
      } 
      // Handle regular post format
      else if (isRegularItem(mediaItem)) {
        // Determine content type based on the URLs
        const isVideo = mediaItem.urls && mediaItem.urls[0] && mediaItem.urls[0].extension === 'mp4';
        
        // Handle video URLs
        if (isVideo && mediaItem.urls && mediaItem.urls.length > 0) {
          for (const urlItem of mediaItem.urls) {
            resources.push({
              type: 'video',
              url: urlItem.url,
              thumbnail: mediaItem.pictureUrl
            });
          }
        } 
        // Handle image URLs
        else if (mediaItem.pictureUrl) {
          resources.push({
            type: 'image',
            url: mediaItem.pictureUrl,
            thumbnail: mediaItem.pictureUrl
          });
        }
      }
    }
    
    // Get the first item for metadata
    const firstItem = responseData.result[0];
    
    // Determine content type - story, carousel, video, or image
    let contentType = 'image';
    if (isStory) {
      contentType = 'story';
    } else if (resources.length > 1) {
      contentType = 'carousel';
    } else if (resources[0]?.type === 'video') {
      contentType = 'video';
    }
    
    // Create a standardized shortcode/id from the URL if not available in response
    let shortcode = '';
    let caption = '';

    if (isStory) {
      // For stories, extract username from URL
      shortcode = sanitizedUrl.split('/stories/')[1]?.replace(/\//g, '') || '';
      caption = '';
    } else if (isRegularItem(firstItem)) {
      // For regular posts, use meta.shortcode if available
      shortcode = firstItem.meta?.shortcode || sanitizedUrl.split('/p/')[1]?.replace(/\//g, '') || '';
      caption = firstItem.meta?.title || '';
    }
    
    // Build our response
    const result = {
      status: 'success',
      info: {
        id: shortcode,
        type: contentType,
        shortcode: shortcode,
        caption: caption,
        resources,
        owner: {
          username: '',
          full_name: ''
        },
        created_at_utc: new Date().toISOString()
      }
    };
    
    console.log('Transformed response:', JSON.stringify(result));
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { status: 'error', error: 'Error fetching Instagram content' },
      { status: 500 }
    );
  }
} 