import { NextRequest, NextResponse } from 'next/server';
import { storeAndGetMediaUrl } from '@/app/utils/r2';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const type = request.nextUrl.searchParams.get('type') as 'image' | 'video';
  const postId = request.nextUrl.searchParams.get('postId') || 'unknown';
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }
  
  if (!type || (type !== 'image' && type !== 'video')) {
    return NextResponse.json(
      { error: 'Valid type parameter (image or video) is required' },
      { status: 400 }
    );
  }
  
  try {
    // Store in R2 and get a presigned URL
    const r2Url = await storeAndGetMediaUrl(url, type, postId);
    
    // Return the R2 presigned URL
    return NextResponse.json({ url: r2Url });
  } catch (error) {
    console.error('Error processing media:', error);
    return NextResponse.json(
      { error: 'Failed to process media', originalUrl: url },
      { status: 500 }
    );
  }
} 