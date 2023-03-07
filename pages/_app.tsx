import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/stars.css';
import '@/styles/misc.css';
import type { AppProps } from 'next/app';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { createClient, WagmiConfig, mainnet } from 'wagmi';
import { INFURA_ID } from '@/utils/constants';
import connectKitTheme from '@/utils/connectKitTheme';
import useWeb3 from '@/hooks/useWeb3';
import useMannys from '@/hooks/useMannys';

const client = createClient(
  getDefaultClient({
    appName: 'mannys.game',
    infuraId: INFURA_ID,
    chains: [mainnet],
  })
);

function Body({ Component, pageProps }: AppProps) {
  const web3 = useWeb3();
  const mannys = useMannys(web3.mannyContract, web3.account.address);

  return <Component {...pageProps} web3={web3} mannys={mannys} />;
}

export default function App(appProps: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        theme="midnight"
        mode="dark"
        customTheme={connectKitTheme}
      >
        <Body {...appProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
