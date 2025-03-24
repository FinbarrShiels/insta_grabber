import React, { useState } from 'react';
import { ClipboardDocumentIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsLoading(true);
      // Simulate loading state for 1.5 seconds
      setTimeout(() => {
        onSubmit(url.trim());
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Instagram link here"
          className="w-full px-5 py-4 bg-white/25 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-white placeholder:text-white pr-36 shadow-lg"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {url ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-white hover:text-white transition-colors rounded-lg flex items-center gap-1 px-3 hover:bg-white/20"
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="text-sm">Clear</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePaste}
              className="p-2 text-white hover:text-white transition-colors bg-white/20 rounded-lg flex items-center gap-1 px-3 cursor-pointer hover:bg-white/30"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
              <span className="text-sm">Paste</span>
            </button>
          )}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!url.trim() || isLoading}
        className={`px-5 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md font-medium w-full
          ${!url.trim() || isLoading 
            ? 'bg-white/60 text-purple-900 cursor-not-allowed' 
            : 'bg-white hover:bg-pink-100 text-purple-800 hover:text-purple-900 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <ArrowDownTrayIcon className="h-5 w-5 animate-bounce-subtle" />
            <span>Download</span>
          </>
        )}
      </button>
    </form>
  );
};

export default UrlInputForm; 