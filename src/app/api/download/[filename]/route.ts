import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Define the temporary directory
const tempDir = path.join(os.tmpdir(), 'instagram-downloads');

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    
    console.log('Serving file for download:', filename);
    
    const filePath = path.join(tempDir, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Read file content
    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type
    let contentType = 'application/octet-stream';
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (filename.endsWith('.png')) {
      contentType = 'image/png';
    } else if (filename.endsWith('.mp4')) {
      contentType = 'video/mp4';
    }
    
    // Create headers for file download
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('File serve error:', error);
    return NextResponse.json({ 
      error: 'Failed to serve file',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 