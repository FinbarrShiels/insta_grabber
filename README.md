# Instagram Downloader

A Next.js application that allows users to download Instagram content including photos, videos, reels, carousels, and stories.

## Features

- Download Instagram photos in full resolution
- Download Instagram videos in HD quality
- Download Instagram reels without watermarks
- Download Instagram stories
- Download all content from carousel posts
- No account required
- No watermarks
- Free to use

## New: Cloudflare R2 Integration

This application now uses Cloudflare R2 for media storage and delivery, providing several benefits:

- **Improved Performance**: Media is served from Cloudflare's global edge network for faster downloads
- **Reduced Bandwidth Costs**: Avoids Vercel's bandwidth limitations
- **Better Reliability**: Media files are cached and served efficiently
- **Better Security**: Media files are served through presigned URLs with expiration times

### Setting Up Cloudflare R2

To use the Cloudflare R2 integration, you need to:

1. Create a Cloudflare R2 bucket
2. Generate API keys for your R2 bucket
3. Set the required environment variables:

```
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=instagram-media
```

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/instagram-downloader.git
cd instagram-downloader
```

2. Install dependencies:
```
npm install
```

3. Create a `.env.local` file with the required environment variables:
```
# Copy the example env file
cp .env.local.example .env.local
# Edit the .env.local file with your values
```

4. Run the development server:
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application can be deployed to Vercel:

```
vercel
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
