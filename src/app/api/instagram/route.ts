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

// Define the response interface for the new API
interface SaveInstaResponse {
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
  
  // Remove query parameters
  const queryParamIndex = sanitizedUrl.indexOf('?');
  if (queryParamIndex !== -1) {
    sanitizedUrl = sanitizedUrl.substring(0, queryParamIndex);
  }
  
  // Remove trailing slash
  if (sanitizedUrl.endsWith('/')) {
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
      } catch (_) {
        // Using underscore to indicate intentionally unused parameter
        return NextResponse.json(
          { status: 'error', error: `API request failed with status ${response.status}` },
          { status: response.status }
        );
      }
    }
    
    const responseData: SaveInstaResponse = await response.json();
    console.log('API response data:', JSON.stringify(responseData));
    
    if (responseData.error) {
      return NextResponse.json(
        { status: 'error', error: 'Failed to fetch Instagram content' },
        { status: 400 }
      );
    }

    // Transform the response to match our application's expected format
    let resources: Resource[] = [];
    
    // Handle single media items
    if (responseData.download_url) {
      resources.push({
        type: responseData.type === 'image' ? 'image' : 'video',
        url: responseData.download_url,
        thumb: responseData.thumb
      });
    }
    
    // Handle media arrays (for carousels, etc.)
    if (responseData.media && responseData.media.length > 0) {
      resources = responseData.media.map(item => ({
        type: item.type === 'image' ? 'image' : 'video',
        url: item.url,
        thumb: responseData.thumb
      }));
    }
    
    // Build our response
    const result = {
      status: 'success',
      info: {
        id: responseData.shortcode,
        type: responseData.type,
        shortcode: responseData.shortcode,
        caption: responseData.caption,
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