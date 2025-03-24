import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="h-9 w-9 sm:h-10 sm:w-10 bg-white rounded-lg flex items-center justify-center mr-2 shadow-md">
        <ArrowDownTrayIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white">
        <span>Insta</span>
        <span className="text-pink-300">Grab</span>
      </div>
    </div>
  );
};

export default Logo; 