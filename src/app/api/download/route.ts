import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPresignedDownloadUrl } from '@/app/utils/r2';

interface DownloadRequest {
  url: string;
  filename: string;
}

// POST handler for downloading content
export async function POST(request: Request) {
  try {
    const { url, filename } = await request.json() as DownloadRequest;
    
    if (!url || !filename) {
      return NextResponse.json(
        { error: 'URL and filename are required' },
        { status: 400 }
      );
    }

    // Fetch the file from the source URL
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    // Create a new Response that streams the data
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': response.headers.get('content-length') || '',
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to download file' },
      { status: 500 }
    );
  }
}

// GET handler for retrieving the file
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');
  const filename = request.nextUrl.searchParams.get('filename') || 'instagram-media';
  
  if (!key) {
    return NextResponse.json(
      { error: 'Key parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    // Generate a presigned URL from R2
    const presignedUrl = await getPresignedDownloadUrl(key);
    
    // Redirect to the presigned URL with correct Content-Disposition header
    return NextResponse.redirect(presignedUrl);
  } catch (error) {
    console.error('Error generating download link:', error);
    return NextResponse.json(
      { error: 'Failed to generate download link' },
      { status: 500 }
    );
  }
} 