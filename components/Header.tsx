import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConnectKitButton } from 'connectkit';
import Pulse from 'react-reveal/Pulse';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import Image from 'next/image';
import { EtherScan, OpenSea, Twitter, Discord } from '@/components/Svg';

function InnerHeader() {
  return (
    <div className="flex flex-col relative z-10 w-4/5 gap-y-2">
      <Link href="/leaderboard" className="hover:text-yellow">
        LEADERBOARD
      </Link>
      <Link href="/achievements" className="hover:text-yellow">
        ACHIEVEMENTS
      </Link>
      <Link href="/dao" className="hover:text-yellow">
        DAO
      </Link>
      <Link href="/tattoo-shop" className="hover:text-yellow">
        TATTOO SHOP
      </Link>
      <Link href="/download" className="hover:text-yellow">
        DOWNLOAD
      </Link>
      <Link href="/about" className="hover:text-yellow">
        ABOUT
      </Link>
      <div className="flex">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://opensea.io/collection/mannys-game"
          className="mr-5 text-green hover:text-yellow"
        >
          <OpenSea className="relative top-[5px]" width="24" height="24" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://etherscan.io/address/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9"
          className="mr-5 text-green hover:text-yellow"
        >
          <EtherScan className="relative top-[4px]" width="24" height="24" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/mannynotfound"
          className="mr-5 text-green hover:text-yellow"
        >
          <Twitter className="relative top-[4px]" width="24" height="24" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/46FyE2ppmj"
          className="text-green hover:text-yellow"
        >
          <Discord className="relative top-[3px]" width="30" height="30" />
        </a>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={twMerge(
        'fixed z-50 flex w-full select-none',
        'top-0 left-0 py-4 px-8 text-xl text-green'
      )}
    >
      {menuOpen && (
        <div className="fixed inset-0" onClick={() => setMenuOpen(false)} />
      )}
      <div className="flex w-full relative h-[50px]">
        <div className="flex flex-1 items-center">
          <div
            className="cursor-pointer select-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={twMerge(
                'font-bold text-yellow text-2xl',
                'inline-block w-[32px] relative',
                menuOpen ? 'top-[1px] left-[5px]' : 'top-[-2px] left-0'
              )}
            >
              {menuOpen ? 'X' : '>_'}
            </span>
            <span className="hover:text-yellow">MENU</span>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-top">
          <Link href="/">
            <Image
              height={52}
              width={120}
              src="/logo.png"
              alt="mannys game logo"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ConnectKitButton />
        </div>
      </div>
      {menuOpen && (
        <div className="absolute w-full md:w-1/3 transition-all left-0 top-[80px]">
          <Pulse duration={500}>
            <Fade duration={500}>
              <div className="w-full h-full p-8">
                <div className="bg-gray-dark border-2 border-solid border-green p-8">
                  <div
                    className="absolute top-0 right-0 text-yellow cursor-pointer p-8"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="p-8 text-2xl font-bold">X</div>
                  </div>
                  <InnerHeader />
                </div>
              </div>
            </Fade>
          </Pulse>
        </div>
      )}
    </header>
  );
}
