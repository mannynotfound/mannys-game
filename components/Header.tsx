import { useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Discord, EtherScan, OpenSea, Twitter } from '@/components/Svg';

function InnerHeader() {
  const links: [string, string][] = [
    ['/leaderboard', 'LEADERBOARD'],
    ['/achievements', 'ACHIEVEMENTS'],
    ['/dao', 'DAO'],
    ['/tattoo-shop', 'TATTOO SHOP'],
    ['/download', 'DOWNLOAD'],
    ['/about', 'ABOUT'],
  ];

  const socials: [React.ElementType, string][] = [
    [OpenSea, 'https://opensea.io/collection/mannys-game'],
    [
      EtherScan,
      'https://etherscan.io/address/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9',
    ],
    [Twitter, 'https://twitter.com/mannynotfound'],
    [Discord, 'https://discord.gg/46FyE2ppmj'],
  ];

  return (
    <div className="flex flex-col relative z-10 w-4/5">
      {links.map(([route, title], i) => (
        <div className="flex items-center w-full h-[32px]" key={`link-${i}`}>
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1, transition: { delay: 0.2 } }}
            exit={{ scaleX: 0 }}
          >
            <Link href={route} className="hover:text-yellow">
              {title}
            </Link>
          </motion.div>
        </div>
      ))}
      <div className="flex gap-x-4 text-green mt-2">
        {socials.map(([Icon, href], i) => (
          <motion.a
            key={`social-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 + i * 0.05 } }}
            exit={{ scale: 0 }}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            className="hover:text-yellow inline-flex items-center"
          >
            <Icon width="24" height="24" />
          </motion.a>
        ))}
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { delay: 0.2 } }}
            transition={{ duration: 0.25 }}
            className="fixed w-full max-w-[446px] left-0 top-[80px] overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              exit={{ width: 0, transition: { delay: 0.2 } }}
              transition={{ duration: 0.25 }}
              className="h-full p-8 pt-0"
            >
              <div className="bg-gray-dark border border-green p-4 relative rounded-md">
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { delay: 0.4 } }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 right-0 text-yellow cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="px-4 py-1 text-2xl font-bold">x</div>
                </motion.button>
                <InnerHeader />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
