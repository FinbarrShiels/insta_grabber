import React from 'react';
import { Tab } from '@headlessui/react';
import { 
  VideoCameraIcon, 
  PhotoIcon, 
  FilmIcon, 
  CameraIcon, 
  ViewColumnsIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'video',
      label: 'Video',
      icon: VideoCameraIcon,
      href: '/video'
    },
    {
      id: 'photo',
      label: 'Photo',
      icon: PhotoIcon,
      href: '/photo'
    },
    {
      id: 'reel',
      label: 'Reels',
      icon: FilmIcon,
      href: '/reel'
    },
    {
      id: 'story',
      label: 'Story',
      icon: CameraIcon,
      href: '/story'
    },
    {
      id: 'carousel',
      label: 'Carousel',
      icon: ViewColumnsIcon,
      href: '/carousel'
    }
  ];

  // Find the index of the active tab
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-1.5 shadow-lg max-w-[900px] mx-auto">
      <Tab.Group selectedIndex={activeIndex} onChange={(index) => onTabChange(tabs[index].id)}>
        <Tab.List className="grid grid-cols-5 gap-1 w-full overflow-hidden">
          {tabs.map((tab) => (
            <Link href={tab.href} key={tab.id} className="outline-none">
              <Tab className={({ selected }) => `
                outline-none ring-transparent transition-all duration-200 py-3 px-2 text-sm rounded-lg
                ${selected 
                  ? 'bg-white/20 text-white font-medium shadow-sm' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'}
                flex flex-col items-center justify-center gap-1.5 cursor-pointer h-full w-full
              `}>
                <tab.icon className="h-5 w-5 flex-shrink-0" />
                <span className="hidden sm:inline-block text-xs sm:text-sm font-medium whitespace-nowrap">{tab.label}</span>
              </Tab>
            </Link>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default TabNavigation; 