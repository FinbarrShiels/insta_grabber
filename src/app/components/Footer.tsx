import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const menuItems = [
    { href: '/photo', label: 'Photo Downloader' },
    { href: '/video', label: 'Video Downloader' },
    { href: '/reel', label: 'Reel Downloader' },
    { href: '/story', label: 'Story Downloader' },
    { href: '/carousel', label: 'Carousel Downloader' },
  ];

  return (
    <div className="w-full py-6 bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm mt-10">
      <footer className="py-6 max-w-[900px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Download Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-white/70 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-white/70 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <div className="space-y-2">
              <Link
                href="/faq"
                className="block text-white/70 hover:text-white text-sm transition-colors"
              >
                FAQ
              </Link>
              <a
                href="mailto:support@instagrab.download"
                className="block text-white/70 hover:text-white text-sm transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-white/50 text-xs">
          <p>Fast & Easy Instagram Media Downloader</p>
          <p className="mt-1">InstaGrab is not affiliated with Instagram, Facebook, or Meta Platforms, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer; 