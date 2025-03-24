import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { generateTempFilename } from '../../utils/api';

// POST handler for downloading content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, contentType, filename } = body;

    if (!url || !contentType || !filename) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required parameters' 
      }, { status: 400 });
    }

    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Generate a unique filename
    const tempFilename = generateTempFilename(contentType, filename);
    const filePath = path.join(tempDir, tempFilename);

    // Download the file
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    // Create a write stream
    const writer = fs.createWriteStream(filePath);

    // Pipe the response data to the file
    response.data.pipe(writer);

    // Return the local file path
    return NextResponse.json({ 
      success: true, 
      filePath: `/temp/${tempFilename}`,
      filename: tempFilename
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to download file' 
    }, { status: 500 });
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