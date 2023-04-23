import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/misc.css';
import '@/styles/stars.css';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import type { AppProps } from 'next/app';
import { WagmiConfig, createClient, mainnet } from 'wagmi';
import useMannys from '@/hooks/useMannys';
import useWeb3 from '@/hooks/useWeb3';
import connectKitTheme from '@/utils/connectKitTheme';
import { INFURA_ID } from '@/utils/constants';

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
