import React from 'react';
import Image from 'next/image';

interface LogoProps {
  large?: boolean;
}

const Logo: React.FC<LogoProps> = ({ large = false }) => {
  if (large) {
    return (
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-xl flex items-center justify-center shadow-md overflow-hidden mb-3">
          <Image 
            src="/logo.svg" 
            alt="InstaGrab Logo" 
            width={96} 
            height={96} 
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="text-3xl font-bold text-white">
          <span>Insta</span>
          <span className="text-pink-200">Grab</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
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
    </div>
  );
};

export default Logo; 