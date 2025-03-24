import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { generateTempFilename } from '../../utils/api';

// POST handler for downloading content
export async function POST(request: Request) {
  try {
    const { url, filename } = await request.json();
    
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
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ 
        success: false, 
        error: 'Filename is required' 
      }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'temp', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ 
        success: false, 
        error: 'File not found' 
      }, { status: 404 });
    }

    // Read the file
    const fileStream = fs.createReadStream(filePath);
    
    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    // Return the file stream
    return new NextResponse(fileStream as any, {
      headers
    });

  } catch (error) {
    console.error('File retrieval error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve file' 
    }, { status: 500 });
  }
} 