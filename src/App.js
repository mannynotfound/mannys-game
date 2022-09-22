import './styles/fonts.css';
import './styles/rainbowkit.css';
import './styles/index.css';
import './styles/stars.css';
import { Buffer } from 'buffer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';

import { Header } from 'components';
import * as Pages from 'pages';
import { useMannys, useLeaderboard, useAchievements, useWeb3 } from 'hooks';
import { INFURA_ID } from 'constants';

if (!window.Buffer) window.Buffer = Buffer;

const Body = () => {
  const leaderboard = useLeaderboard();
  const achievements = useAchievements();
  const web3 = useWeb3();
  const mannys = useMannys(web3?.mannyContract, web3?.account?.address);

  return (
    <BrowserRouter>
      <Header {...web3} />
      <Switch>
        <Route exact path="/">
          <Pages.Splash {...web3} leaderboard={leaderboard} mannys={mannys} />
        </Route>
        <Route path="/mint">
          <Redirect to="/" />
        </Route>
        <Route path="/about">
          <Pages.About />
        </Route>
        <Route path="/download">
          <Pages.Download {...web3} mannys={mannys} />
        </Route>
        <Route path="/oncyber">
          <Pages.Oncyber {...web3} mannys={mannys} />
        </Route>
        <Route path="/docs">
          <Pages.Docs />
        </Route>
        <Route exact path="/dao">
          <Pages.Dao {...web3} />
        </Route>
        <Route exact path="/dao/assets">
          <Pages.Assets {...web3} />
        </Route>
        <Route path="/dao/assets/:assetSlug">
          <Pages.Asset {...web3} />
        </Route>
        <Route path="/tattoo-shop">
          <Pages.TattooShop {...web3} mannys={mannys} />
        </Route>
        <Route path="/tattoo-view/:tokenId">
          <Pages.TattooView />
        </Route>
        <Route path="/leaderboard">
          <Pages.Leaderboard leaderboard={leaderboard} />
        </Route>
        <Route path="/achievement/:achievementId">
          <Pages.Achievement />
        </Route>
        <Route exact path="/achievements">
          <Pages.Achievements
            account={web3.account}
            achievements={achievements}
          />
        </Route>
        <Route path="/achievements/:address">
          <Pages.Achievements
            account={web3.account}
            achievements={achievements}
          />
        </Route>
        <Route path="/plaque/:gamer">
          <Pages.Plaque />
        </Route>
        <Route path="/:tokenId/3p">
          <Pages.TokenThirdPerson {...web3} achievements={achievements} />
        </Route>
        <Route path="/:tokenId">
          <Pages.Token {...web3} achievements={achievements} mannys={mannys} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const App = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet],
    [infuraProvider({ infuraId: INFURA_ID })]
  );
  const { connectors } = getDefaultWallets({
    appName: 'mannys.game',
    chains,
  });
  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Body />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
