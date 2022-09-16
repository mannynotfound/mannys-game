import { useState } from 'react';
import Pulse from 'react-reveal/Pulse';
import Fade from 'react-reveal/Fade';
import { Link, withRouter } from 'react-router-dom';
import Account from './Account';
import Address from './Address';
import Button from './Button';
import { EtherScan, OpenSea, Twitter, Discord } from './Svg';

const InnerHeader = () => (
  <div className="flex flex-col relative z-10 w-4/5">
    <Link to="/leaderboard" className="mb-2 hover:text-yellow">
      LEADERBOARD
    </Link>
    <Link to="/achievements" className="mb-2 hover:text-yellow">
      ACHIEVEMENTS
    </Link>
    <Link to="/dao" className="mb-2 hover:text-yellow">
      DAO
    </Link>
    <Link to="/tattoo-shop" className="mb-2 hover:text-yellow">
      TATTOO SHOP
    </Link>
    <Link to="/download" className="mb-2 hover:text-yellow">
      DOWNLOAD
    </Link>
    <Link to="/about" className="mb-2 hover:text-yellow">
      ABOUT
    </Link>
    <div className="flex mt-2">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://opensea.io/collection/mannys-game"
        className="mr-5 text-green hover:text-yellow"
      >
        <OpenSea
          width="24"
          height="24"
          style={{ position: 'relative', top: 5 }}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://etherscan.io/address/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9"
        className="mr-5 text-green hover:text-yellow"
      >
        <EtherScan
          width="24"
          height="24"
          style={{ position: 'relative', top: 4 }}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/mannynotfound"
        className="mr-5 text-green hover:text-yellow"
      >
        <Twitter
          width="24"
          height="24"
          style={{ position: 'relative', top: 4 }}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discord.gg/46FyE2ppmj"
        className="text-green hover:text-yellow"
      >
        <Discord
          width="30"
          height="30"
          style={{ position: 'relative', top: 3 }}
        />
      </a>
    </div>
  </div>
);

const hiddenRoutes = ['/docs'];

const Header = ({ account, disconnect, location }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);

  if (hiddenRoutes.some((hr) => location?.pathname.includes(hr))) {
    return null;
  }

  return (
    <header className="flex fixed z-50 w-full top-0 left-0 py-4 px-8 text-xl text-green select-none">
      {menuOpen && (
        <div
          className="absolute w-full md:w-1/3 transition-all z-20 left-0"
          style={{ top: 80 }}
        >
          <Pulse duration={500}>
            <Fade duration={500}>
              <div className="w-full h-full p-8">
                <div className="bg-gray-dark border-2 border-solid border-green p-8">
                  <div
                    className="absolute top-0 right-0 text-yellow cursor-pointer p-8 z-0"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="p-8 text-2xl">
                      <b>X</b>
                    </div>
                  </div>
                  <InnerHeader />
                </div>
              </div>
            </Fade>
          </Pulse>
        </div>
      )}
      {walletMenuOpen && (
        <div
          className="absolute w-full md:w-1/3 transition-all z-20 right-0"
          style={{ top: 80 }}
        >
          <Pulse duration={500}>
            <Fade duration={500}>
              <div className="w-full h-full p-8">
                <div className="bg-gray-dark border-2 border-solid border-green p-8">
                  <div
                    className="absolute top-0 right-0 text-yellow cursor-pointer p-8 z-0"
                    onClick={() => setWalletMenuOpen(false)}
                  >
                    <div className="p-8 text-2xl">
                      <b>X</b>
                    </div>
                  </div>
                  <div>
                    <div className="text-white">
                      Logged in as{' '}
                      <Address
                        account={{ address: account?.address }}
                        size="short"
                      />
                    </div>
                    <div className="mt-4">
                      <Button
                        className="w-full block text-center hover:text-white"
                        large
                        onClick={() => {
                          setWalletMenuOpen(false);
                          disconnect();
                        }}
                        color="magenta"
                      >
                        Log Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </Pulse>
        </div>
      )}
      {walletMenuOpen && (
        <div
          className="fixed z-10 inset-0"
          onClick={() => setWalletMenuOpen(false)}
        />
      )}
      {menuOpen && (
        <div
          className="fixed z-10 inset-0"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="flex w-full relative z-10" style={{ height: 50 }}>
        <div className="flex flex-1 items-center">
          <div
            className="cursor-pointer select-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className="text-yellow text-2xl inline-block"
              style={{ width: 32 }}
            >
              <b
                style={{
                  position: 'relative',
                  top: menuOpen ? 1 : -2,
                  left: menuOpen ? 5 : 0,
                }}
              >
                {menuOpen ? 'X' : '>_'}
              </b>
            </span>
            <span className="hover:text-yellow">MENU</span>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-top">
          <Link to="/">
            <img
              src="/logo.png"
              height="auto"
              width="120"
              alt="mannys game logo"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Account account={account} setWalletMenuOpen={setWalletMenuOpen} />
        </div>
      </div>
    </header>
  );
};

export default withRouter((props) => <Header {...props} />);
