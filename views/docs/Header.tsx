import { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { GitHub } from '@/components/Svg';
import Menu, { MenuConfig } from '@/views/docs/menus';

type Props = {
  title: string;
  version: string;
  homePath: string;
  contentPath: string;
  docsPath: string;
  gitHubPath: string;
  menuCfg: MenuConfig;
};

export default function Header({
  title,
  version,
  homePath,
  contentPath,
  docsPath,
  gitHubPath,
  menuCfg,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={twMerge(
        'flex fixed z-50 w-full top-0 left-0',
        'select-none border-b border-yellow bg-gray-dark'
      )}
    >
      {menuOpen && (
        <div className="absolute w-full transition-all z-20 left-0 top-[64px]">
          <Pulse duration={500}>
            <Fade duration={500}>
              <div className="w-full h-full">
                <div className="bg-gray-dark border-2 border-solid border-green p-8">
                  <div
                    className="absolute top-0 right-0 text-yellow cursor-pointer p-4 z-0"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="p-8 text-2xl font-bold">X</div>
                  </div>
                  <div className="max-w-[200px]">
                    <Menu
                      docsPath={docsPath}
                      menuCfg={menuCfg}
                      contentPath={contentPath}
                      onClick={() => setMenuOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </Pulse>
        </div>
      )}
      {menuOpen && (
        <div
          className="fixed z-10 inset-0"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="w-full max-w-screen-xl mx-auto px-8 py-4">
        <div className="flex w-full justify-between">
          <div className="text-green text-xl flex items-center">
            <div
              className="cursor-pointer select-none inline-block mr-4 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="text-yellow text-2xl mr-2 w-[32px] font-bold">
                <span
                  className={twMerge(
                    'relative',
                    menuOpen ? 'top-[1px] left-[5px]' : 'top-[-2px] left-0'
                  )}
                >
                  {menuOpen ? 'X' : '≡'}
                </span>
              </span>
            </div>
            <Link href={homePath}>
              <b>{title}</b>
              <span className="text-gray-lightest"> - </span>
              <span className="text-lg">v{version}</span>
            </Link>
          </div>
          <div>
            <a
              className="text-lg text-gray-lightest hover:text-yellow"
              href={`https://github.com/mannynotfound/${gitHubPath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
