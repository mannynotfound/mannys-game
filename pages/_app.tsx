import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/misc.css';
import '@/styles/stars.css';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import useMannys from '@/hooks/useMannys';
import useWeb3 from '@/hooks/useWeb3';
import connectKitTheme from '@/utils/connectKitTheme';
import { INFURA_ID, WALLET_CONNECT_ID } from '@/utils/constants';

const config = createConfig(
  getDefaultConfig({
    appName: 'mannys.game',
    infuraId: INFURA_ID,
    walletConnectProjectId: WALLET_CONNECT_ID ?? '',
    chains: [mainnet],
  })
);

function Body({ Component, pageProps }: AppProps) {
  const web3 = useWeb3();
  const mannys = useMannys(web3.account.address);

  return <Component {...pageProps} web3={web3} mannys={mannys} />;
}

export default function App(appProps: AppProps) {
  return (
    <WagmiConfig config={config}>
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
