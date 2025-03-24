'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FaqPage: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    {
      question: "What makes InstaGrab so convenient for downloading Instagram content?",
      answer: (
        <p>
          InstaGrab lets you quickly save photos and videos from Instagram with just a few clicks. Simply paste the Instagram URL, hit Download, and the content is yours to keep forever. It&apos;s the perfect way to preserve your favorite memories without hassle.
        </p>
      )
    },
    {
      question: "How exactly do I download content using InstaGrab?",
      answer: (
        <ol className="list-decimal pl-5 space-y-2">
          <li>Copy the URL of any Instagram post, reel, or story you want to download</li>
          <li>Paste it into InstaGrab&apos;s search bar and click &quot;Download&quot;</li>
          <li>Choose which media files you want to save from the results</li>
          <li>Click the download button for each item you want to save</li>
        </ol>
      )
    },
    {
      question: "Will I get the full quality when downloading Instagram content?",
      answer: (
        <p>
          Absolutely! InstaGrab downloads content at the same resolution and quality as the original upload. We don&apos;t compress or reduce quality in any way - what you see on Instagram is exactly what you&apos;ll get when you download.
        </p>
      )
    },
    {
      question: "Do I need to install any additional software to use InstaGrab?",
      answer: (
        <p>
          Not at all! InstaGrab is a web-based tool that works directly in your browser. There&apos;s no need to install any extra software, plugins, or browser extensions. Just visit our website, paste the link, and download your content instantly.
        </p>
      )
    },
    {
      question: "Is it legal to download content from Instagram?",
      answer: (
        <p>
          Downloading publicly available content from Instagram for personal use is generally acceptable. However, remember to respect copyright and intellectual property rights. Never claim others&apos; content as your own or use it for commercial purposes without permission. Always credit creators when sharing their work.
        </p>
      )
    },
    {
      question: "Where are my downloaded files stored on my device?",
      answer: (
        <p>
          Files are saved to your default download location, which varies by browser and device settings. On most computers, this is the &quot;Downloads&quot; folder. You can check your downloads by pressing Ctrl+J (Windows/Linux) or Command+J (Mac) in most browsers, or by checking your browser&apos;s download history.
        </p>
      )
    },
    {
      question: "What devices can I use InstaGrab on?",
      answer: (
        <p>
          InstaGrab works on any device with a web browser - including smartphones, tablets, laptops, and desktop computers. Whether you&apos;re using iOS, Android, Windows, Mac, or Linux, as long as you have an internet connection and a modern browser, you can use InstaGrab to download Instagram content.
        </p>
      )
    },
    {
      question: "Can I download multiple files at once?",
      answer: (
        <p>
          Yes! For carousel posts with multiple photos or videos, InstaGrab gives you the option to download each item individually or use the &quot;Download All&quot; button to save everything at once. For stories with multiple segments, each story segment can be downloaded separately.
        </p>
      )
    },
    {
      question: "Does InstaGrab keep copies of the content I download?",
      answer: (
        <p>
          No, InstaGrab doesn&apos;t store any of the content you download on our servers. We simply provide a bridge between Instagram and your device. Downloaded content goes directly to your device, and we maintain no record of what you&apos;ve downloaded or accessed.
        </p>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-12 flex-grow max-w-[900px]">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white text-sm md:text-base max-w-2xl mx-auto">
            Find answers to common questions about using InstaGrab to download Instagram photos, videos, reels, and stories.
          </p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <button
                className={`w-full text-left p-4 rounded-lg flex items-center justify-between transition-colors ${
                  expandedIndex === index 
                    ? 'bg-white/25 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
                onClick={() => toggleExpanded(index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedIndex === index && (
                <div className="mt-2 p-4 bg-white/10 rounded-lg text-white">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Still have questions?</h2>
          <p className="text-white mb-4">
            If you couldn&apos;t find the answer to your question, feel free to contact us. We&apos;re here to help!
          </p>
          <a 
            href="mailto:support@instagrab.com" 
            className="inline-block px-6 py-3 bg-white text-purple-700 rounded-lg font-medium hover:bg-pink-100 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default FaqPage; 