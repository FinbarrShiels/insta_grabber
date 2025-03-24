import { NextRequest, NextResponse } from 'next/server';
import { getPresignedDownloadUrl } from '@/app/utils/r2';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');
  
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