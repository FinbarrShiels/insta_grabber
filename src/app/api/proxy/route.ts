import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }
    
    console.log('Proxying image from URL:', imageUrl.substring(0, 100) + '...');
    
    // Download the image
    try {
      const response = await axios({
        method: 'GET',
        url: imageUrl,
        responseType: 'arraybuffer',
        timeout: 10000, // 10 second timeout
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.instagram.com/'
        }
      });
      
      // Determine content type from response or fallback to a default
      const contentType = response.headers['content-type'] || 'image/jpeg';
      
      // Create headers for the response
      const headers = new Headers();
      headers.set('Content-Type', contentType);
      headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      
      return new NextResponse(Buffer.from(response.data), {
        status: 200,
        headers,
      });
    } catch (downloadError) {
      console.error('Error proxying image:', downloadError);
      return NextResponse.json({ 
        error: 'Failed to proxy image',
        message: downloadError instanceof Error ? downloadError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ 
      error: 'Failed to proxy image',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 