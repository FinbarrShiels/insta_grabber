import React from 'react';
import Logo from './Logo';

const InfoCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10 mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-500 p-6 flex items-center justify-center">
          <div className="w-40 h-40">
            <Logo large />
          </div>
        </div>
        <div className="md:w-2/3 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Instagram Videos and Photos Download
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            InstaGrab is an online web tool that helps you download Instagram Videos, Photos, Reels, and Stories. 
            InstaGrab is designed to be easy to use on any device, such as a mobile phone, tablet, or computer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard; 