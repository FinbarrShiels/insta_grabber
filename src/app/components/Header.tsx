import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { Fragment } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-700 to-pink-600">
      <header className="flex justify-between items-center py-3 sm:py-4 max-w-[900px] mx-auto px-4">
        <div className="flex-shrink-0">
          <Link href="/" aria-label="InstaGrab Home">
            <Logo />
          </Link>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-5">
          <Link
            href="/faq"
            className="text-white group flex items-center gap-1 text-sm font-medium hover:text-white/80 transition-colors"
            aria-label="Frequently Asked Questions"
          >
            <QuestionMarkCircleIcon className="h-4 w-4 text-white/80 group-hover:text-white/90 transition-colors" />
            <span>FAQ</span>
          </Link>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-1 text-white text-sm font-medium hover:text-pink-200 transition-colors">
              <span>EN</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-purple-100 text-purple-600' : 'text-gray-700'
                        } block px-4 py-2 text-sm`}
                        lang="en"
                      >
                        English
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-purple-100 text-purple-600' : 'text-gray-700'
                        } block px-4 py-2 text-sm`}
                        lang="es"
                      >
                        Español
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-purple-100 text-purple-600' : 'text-gray-700'
                        } block px-4 py-2 text-sm`}
                        lang="fr"
                      >
                        Français
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
    </div>
  );
};

export default Header; 