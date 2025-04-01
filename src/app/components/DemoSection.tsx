import React from 'react';
import Image from 'next/image';

interface DemoSectionProps {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
}

const DemoSection: React.FC<DemoSectionProps> = ({ title, content, imageSrc, imageAlt }) => {
  return (
    <div className="w-full my-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-8 px-4 md:px-8 bg-white/5 rounded-xl backdrop-blur-sm border border-brand-teal-light/20">
        {/* Image container (1/3 on desktop) */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 md:w-full md:h-auto aspect-square">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        {/* Content container (2/3 on desktop) */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-base md:text-lg text-gray-100 leading-relaxed">{content}</p>
        </div>
      </div>

      {/* Horizontal divider */}
      <div className="divider"></div>
    </div>
  );
};

export default DemoSection; 