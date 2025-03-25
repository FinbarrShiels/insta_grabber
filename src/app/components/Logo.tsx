import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center mr-2 shadow-md overflow-hidden">
        <Image 
          src="/logo.svg" 
          alt="InstaGrab Logo" 
          width={40} 
          height={40} 
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white">
        <span>Insta</span>
        <span className="text-pink-300">Grab</span>
      </div>
    </Link>
  );
};

export default Logo; 