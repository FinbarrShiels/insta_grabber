import React from 'react';

const DownloadSteps: React.FC = () => {
  const steps = [
    {
      title: 'Copy Link',
      description: 'Find the Instagram content you want to download and copy its URL from the address bar or share button.',
      icon: (
        <div className="w-full h-auto p-0 m-0 overflow-hidden">
          <img 
            src="/images/copy-new.svg" 
            alt="Copy Link" 
            className="w-full h-auto object-cover rounded-t-xl" 
            style={{ 
              maxHeight: "220px",
              minHeight: "180px",
              width: "100%",
              display: "block",
              marginLeft: 0,
              marginRight: 0
            }}
          />
        </div>
      )
    },
    {
      title: 'Paste URL',
      description: 'Paste the copied Instagram URL into the search bar above.',
      icon: (
        <div className="w-full h-auto p-0 m-0 overflow-hidden">
          <img 
            src="/images/paste-new.svg" 
            alt="Paste URL" 
            className="w-full h-auto object-cover rounded-t-xl" 
            style={{ 
              maxHeight: "220px",
              minHeight: "180px",
              width: "100%",
              display: "block",
              marginLeft: 0,
              marginRight: 0
            }}
          />
        </div>
      )
    },
    {
      title: 'Download',
      description: 'Click the download button that appears to save your high-quality Instagram content.',
      icon: (
        <div className="w-full h-auto p-0 m-0 overflow-hidden">
          <img 
            src="/images/download-new.svg" 
            alt="Download" 
            className="w-full h-auto object-cover rounded-t-xl" 
            style={{ 
              maxHeight: "220px",
              minHeight: "180px",
              width: "100%",
              display: "block",
              marginLeft: 0,
              marginRight: 0
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
        How to download from Instagram?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 justify-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm border border-brand-teal-light/20 hover:bg-white/15 transition-all w-[312px] mx-auto">
            <div className="w-full overflow-hidden">{step.icon}</div>
            <div className="p-4 sm:p-6 w-full">
              <h3 className="text-xl font-bold text-[#2dd4bf] mb-3 text-center">
                {step.title}
              </h3>
              <div className="w-16 h-px bg-white/30 mx-auto mb-3"></div>
              <p className="text-gray-100 text-left">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal divider */}
      <div className="divider"></div>
    </div>
  );
};

export default DownloadSteps; 