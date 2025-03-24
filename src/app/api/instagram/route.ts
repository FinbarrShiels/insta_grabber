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
  result: {
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
  }[];
  success: boolean;
  message: string;
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
    let resources: Resource[] = [];
    const mediaItem = responseData.result[0];
    
    // Determine content type based on the URLs
    const isVideo = mediaItem.urls && mediaItem.urls[0] && mediaItem.urls[0].extension === 'mp4';
    
    // Handle video URLs
    if (isVideo && mediaItem.urls.length > 0) {
      for (const urlItem of mediaItem.urls) {
        resources.push({
          type: 'video',
          url: urlItem.url,
          thumbnail: mediaItem.pictureUrl
        });
      }
    } 
    // Handle image URLs (if no video URLs found)
    else if (mediaItem.pictureUrl) {
      resources.push({
        type: 'image',
        url: mediaItem.pictureUrl,
        thumbnail: mediaItem.pictureUrl
      });
    }
    
    // Build our response
    const result = {
      status: 'success',
      info: {
        id: mediaItem.meta.shortcode,
        type: isVideo ? 'video' : 'image',
        shortcode: mediaItem.meta.shortcode,
        caption: mediaItem.meta.title || '',
        resources,
        owner: {
          username: '',
          full_name: ''
        },
        created_at_utc: new Date(mediaItem.meta.takenAt * 1000).toISOString()
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