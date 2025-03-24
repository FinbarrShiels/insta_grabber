import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2, getPresignedDownloadUrl } from '@/app/utils/r2';

// Mark as edge function
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Create a simple test image (1x1 transparent pixel as base64)
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    // Generate a unique key for the test image
    const timestamp = Date.now();
    const testKey = `test/test-upload-${timestamp}.png`;
    
    // Upload the test image to R2
    await uploadToR2(testKey, imageBuffer, 'image/png');
    
    // Generate a presigned URL to verify the upload
    const presignedUrl = await getPresignedDownloadUrl(testKey);
    
    // Return success with the presigned URL
    return NextResponse.json({
      status: 'success',
      message: 'Test file uploaded successfully to R2',
      key: testKey,
      url: presignedUrl,
      timestamp,
    });
  } catch (error: any) {
    console.error('R2 upload test error:', error);
    
    // Return error details
    return NextResponse.json({
      status: 'error',
      message: 'R2 upload test failed',
      error: error.message,
      code: error.code,
    }, { status: 500 });
  }
} 