import { S3Client } from '@aws-sdk/client-s3';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Cloudflare R2 configuration
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

/**
 * Generate a presigned URL for downloading content from R2
 * @param key The object key in the R2 bucket
 * @param expiresIn Number of seconds until the presigned URL expires (default: 3600)
 * @returns Presigned URL for downloading
 */
export async function getPresignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });
  
  const url = await getSignedUrl(r2Client, command, { expiresIn });
  return url;
}

/**
 * Upload media content to R2 storage
 * @param key The key to use for the uploaded object
 * @param content The content to upload
 * @param contentType The content type of the media
 * @returns The key of the uploaded object
 */
export async function uploadToR2(
  key: string, 
  content: Buffer | Uint8Array, 
  contentType: string
): Promise<string> {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: content,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // Cache for 1 year
    })
  );
  
  return key;
}

/**
 * Generate a random 4-digit code for uniqueness
 * @returns A 4-digit random code
 */
function generateRandomCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Store Instagram media in R2 and return a presigned URL
 * @param url Instagram media URL
 * @param type Media type ('image' or 'video')
 * @param postId Post identifier (shortcode or username)
 * @returns Presigned URL for accessing the stored media
 */
export async function storeAndGetMediaUrl(
  url: string, 
  type: 'image' | 'video', 
  postId: string
): Promise<string> {
  try {
    // Clean postId to ensure it's valid for a filename
    const safePostId = postId.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
    
    // Generate a unique key for the media file
    const extension = type === 'image' ? 'jpg' : 'mp4';
    const randomCode = generateRandomCode();
    const key = `${safePostId}-${randomCode}.${extension}`;
    
    // Fetch the content from Instagram
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }
    
    const contentBuffer = await response.arrayBuffer();
    
    // Upload to R2
    await uploadToR2(
      key, 
      new Uint8Array(contentBuffer), 
      type === 'image' ? 'image/jpeg' : 'video/mp4'
    );
    
    // Generate and return a presigned URL
    return await getPresignedDownloadUrl(key);
  } catch (error) {
    console.error('Failed to store media in R2:', error);
    // If R2 storage fails, return the original URL as fallback
    return url;
  }
} 