import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListBucketsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Mark as edge function
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
  const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '';
  const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '';
  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'instagrab';
  
  // Initialize R2 client
  const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  try {
    // Test bucket connection
    const listObjectsResponse = await r2Client.send(
      new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        MaxKeys: 10,
      })
    );
    
    // Return success with objects and configuration info
    return NextResponse.json({
      status: 'success',
      message: 'R2 connection successful',
      bucketName: R2_BUCKET_NAME,
      objectCount: listObjectsResponse.KeyCount,
      // Only send partial object data for security
      objects: listObjectsResponse.Contents?.map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      })) || [],
      // Mask sensitive values for security
      config: {
        accountId: R2_ACCOUNT_ID ? '***' + R2_ACCOUNT_ID.substring(R2_ACCOUNT_ID.length - 4) : 'Not configured',
        accessKeyConfigured: !!R2_ACCESS_KEY_ID,
        secretKeyConfigured: !!R2_SECRET_ACCESS_KEY,
      },
    });
  } catch (error: any) {
    console.error('R2 test error:', error);
    
    // Return error details
    return NextResponse.json({
      status: 'error',
      message: 'R2 connection failed',
      error: error.message,
      code: error.code,
      // Mask sensitive values for security
      config: {
        accountId: R2_ACCOUNT_ID ? '***' + R2_ACCOUNT_ID.substring(R2_ACCOUNT_ID.length - 4) : 'Not configured',
        accessKeyConfigured: !!R2_ACCESS_KEY_ID,
        secretKeyConfigured: !!R2_SECRET_ACCESS_KEY,
        bucketName: R2_BUCKET_NAME,
      },
    }, { status: 500 });
  }
} 