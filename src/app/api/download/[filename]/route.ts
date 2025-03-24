import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

type Props = {
  params: {
    filename: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { filename } = params;
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const contentType = filename.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg';

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error streaming file:', error);
    return NextResponse.json(
      { error: 'Failed to stream file' },
      { status: 500 }
    );
  }
} 