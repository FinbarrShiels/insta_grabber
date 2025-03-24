import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.INSTAGRAM_API_KEY;
const API_ENDPOINT = 'https://instagram-looter2.p.rapidapi.com/post-dl';

// Define the resource interface
interface Resource {
  type: string;
  url: string;
  thumbnail?: string;
}

interface InstagramMedia {
  type: string;
  link: string;
  img: string;
}

interface InstagramResponse {
  data: {
    full_name: string;
    username: string;
    medias: InstagramMedia[];
    comment_count: number | null;
    like_count: number;
    taken_at_timestamp: number;
    caption: string;
  };
  status: boolean;
  attempts: number;
}

// Sanitize the Instagram URL
const sanitizeInstagramUrl = (url: string): string => {
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
  
  // Handle reel URLs
  if (sanitizedUrl.includes('/reel/')) {
    // Convert /reel/ to /p/ for consistency
    sanitizedUrl = sanitizedUrl.replace('/reel/', '/p/');
  }
  
  // Remove any trailing slashes
  sanitizedUrl = sanitizedUrl.replace(/\/$/, '');
  
  console.log('Sanitized URL:', sanitizedUrl);
  return sanitizedUrl;
};

// POST handler for getting Instagram content
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { status: 'error', message: 'URL is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      console.error('Instagram API key is not configured');
      return NextResponse.json(
        { status: 'error', message: 'API configuration error' },
        { status: 500 }
      );
    }

    const sanitizedUrl = sanitizeInstagramUrl(url);
    
    console.log('Fetching Instagram content for URL:', sanitizedUrl);
    
    const response = await fetch(`${API_ENDPOINT}?url=${encodeURIComponent(sanitizedUrl)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Instagram API error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      return NextResponse.json(
        { 
          status: 'error', 
          message: `API request failed: ${response.statusText}`,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Handle error from the API
    if (!data.status) {
      console.error('API returned error status:', data);
      return NextResponse.json({ 
        status: 'error', 
        message: 'Failed to fetch content',
        details: data
      }, { status: 400 });
    }
    
    // Process the data from the API
    const apiData = data as InstagramResponse;
    
    if (!apiData.data) {
      console.error('No data in API response:', data);
      return NextResponse.json({ 
        status: 'error', 
        message: 'No data received from Instagram',
        details: data
      }, { status: 400 });
    }
    
    // Create a standardized result structure
    const result = {
      status: 'success',
      info: {
        id: apiData.data.username || '',
        type: apiData.data.medias?.[0]?.type || 'unknown',
        shortcode: apiData.data.username || '',
        caption: apiData.data.caption || '',
        owner: {
          username: apiData.data.username,
          full_name: apiData.data.full_name
        },
        created_at_utc: new Date(apiData.data.taken_at_timestamp * 1000).toISOString(),
        resources: [] as Resource[]
      }
    };
    
    // Handle the response based on the new API structure
    if (apiData.data.medias && Array.isArray(apiData.data.medias)) {
      result.info.resources = apiData.data.medias.map((item: InstagramMedia) => ({
        type: item.type || 'image',
        url: item.link || '',
        thumbnail: item.img || item.link || ''
      }));
    }
    
    // Additional logging for debugging
    console.log('Processed result info:', JSON.stringify({
      id: result.info.id,
      type: result.info.type,
      shortcode: result.info.shortcode,
      resourceCount: result.info.resources.length
    }));
    
    if (result.info.resources && result.info.resources.length > 0) {
      console.log('Resource URLs:');
      result.info.resources.forEach((resource: Resource, index: number) => {
        console.log(`Resource ${index}: ${resource.type} - ${resource.url.substring(0, 100)}...`);
      });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in Instagram API route:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 