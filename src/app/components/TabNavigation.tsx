import React from 'react';
import { useRouter } from 'next/navigation';
import { Tab } from '@headlessui/react';
import { 
  VideoCameraIcon, 
  PhotoIcon, 
  FilmIcon, 
  CameraIcon, 
  ViewColumnsIcon
} from '@heroicons/react/24/outline';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const router = useRouter();

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

  // Find the index of the active tab, return -1 if no active tab or on home page
  const activeIndex = activeTab ? tabs.findIndex(tab => tab.id === activeTab) : -1;

  // Handle tab click with navigation
  const handleTabClick = (index: number) => {
    onTabChange(tabs[index].id);
    router.push(tabs[index].href);
  };

  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-1.5 shadow-lg max-w-[900px] mx-auto">
      <Tab.Group selectedIndex={activeIndex === -1 ? undefined : activeIndex} onChange={handleTabClick}>
        <Tab.List className="flex space-x-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) => `
                flex-1 py-3 px-2 rounded-lg outline-none ring-transparent transition-all duration-200
                ${selected
                  ? 'bg-white/20 text-white font-medium shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'}
                flex flex-col items-center justify-center gap-1.5 cursor-pointer
              `}
              aria-label={tab.label}
            >
              <tab.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline-block text-xs sm:text-sm font-medium whitespace-nowrap">
                {tab.label}
              </span>
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default TabNavigation; 