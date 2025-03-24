import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Environment variables for API access
const RAPID_API_KEY = process.env.RAPID_API_KEY || 'ad481be39bmshfbb217c42d90632p144f43jsn4094a159a171';
const RAPID_API_HOST = 'instagram-looter2.p.rapidapi.com';

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
    data: {
      owner: {
        username: string;
        full_name: string;
      };
      created_at_utc: number;
      medias: InstagramMedia[];
      comment_count: number;
      like_count: number;
      caption: string;
    };
    status: string;
  };
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
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'URL is required' 
      }, { status: 400 });
    }
    
    const sanitizedUrl = sanitizeInstagramUrl(url);
    
    console.log('Fetching Instagram content for URL:', sanitizedUrl);
    
    // Make request to Rapid API with the new endpoint
    const response = await axios.get('https://instagram-looter2.p.rapidapi.com/post-dl', {
      params: { url: sanitizedUrl },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    });
    
    // Log the full response for debugging
    console.log('Full API Response:', JSON.stringify(response.data, null, 2));
    
    // Handle error from the API
    if (!response.data.status) {
      console.error('API returned error status:', response.data);
      return NextResponse.json({ 
        status: 'error', 
        message: response.data.message || 'Failed to fetch content',
        details: response.data
      }, { status: 400 });
    }
    
    // Process the data from the API
    const apiData = response.data as InstagramResponse;
    
    if (!apiData) {
      console.error('No data in API response:', response.data);
      return NextResponse.json({ 
        status: 'error', 
        message: 'No data received from Instagram',
        details: response.data
      }, { status: 400 });
    }
    
    // Create a standardized result structure
    const result = {
      status: 'success',
      info: {
        id: apiData.data.data.owner.username || '',
        type: apiData.data.data.medias?.[0]?.type || 'unknown',
        shortcode: apiData.data.data.owner.username || '',
        caption: apiData.data.data.caption || '',
        owner: {
          username: apiData.data.data.owner.username,
          full_name: apiData.data.data.owner.full_name
        },
        created_at_utc: new Date(apiData.data.data.created_at_utc * 1000).toISOString(),
        resources: [] as Resource[]
      }
    };
    
    // Handle the response based on the new API structure
    if (apiData.data.data.medias && Array.isArray(apiData.data.data.medias)) {
      result.info.resources = apiData.data.data.medias.map((item: InstagramMedia) => ({
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
    console.error('Instagram fetch error:', error);
    
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;
    let errorDetails = null;
    
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      errorMessage = error.response?.data?.message || error.message;
      statusCode = error.response?.status || 500;
      errorDetails = error.response?.data;
    }
    
    return NextResponse.json({ 
      status: 'error',
      message: errorMessage,
      details: errorDetails
    }, { status: statusCode });
  }
} 