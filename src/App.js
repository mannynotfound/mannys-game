import './styles/fonts.css';
import './styles/index.css';
import './styles/stars.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { chain, createClient, WagmiConfig } from 'wagmi';

import { Header } from 'components';
import * as Pages from 'pages';
import { useMannys, useLeaderboard, useAchievements, useWeb3 } from 'hooks';
import { INFURA_ID } from 'constants';

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
        <Route path="/mannyverse/:tokenId">
          <Pages.Mannyverse {...web3} achievements={achievements} />
        </Route>
        <Route path="/:tokenId">
          <Pages.Token {...web3} achievements={achievements} mannys={mannys} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const primaryColor = '#70bf44';
const secondaryColor = '#f0c925';

const App = () => {
  const client = createClient(
    getDefaultClient({
      appName: 'mannys.game',
      infuraId: INFURA_ID,
      chains: [chain.mainnet],
    })
  );

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        theme="midnight"
        mode="dark"
        customTheme={{
          '--ck-font-family': '"PP Mono"',
          '--ck-accent-color': secondaryColor,
          '--ck-accent-text-color': '#000',
          '--ck-focus-color': secondaryColor,
          '--ck-spinner-color': secondaryColor,
          '--ck-body-action-color': secondaryColor,
          '--ck-body-background': `#0e0e0e`,
          '--ck-modal-box-shadow': `0 0 0 2px ${primaryColor}`,
          '--ck-border-radius': '0px',

          '--ck-primary-button-background': '#0e0e0e',
          '--ck-primary-button-border-radius': '0px',
          '--ck-primary-button-box-shadow': `0 0 0 2px ${primaryColor}`,
          '--ck-primary-button-hover-color': '#0e0e0e',
          '--ck-primary-button-hover-background': primaryColor,

          '--ck-secondary-button-background': '#0e0e0e',
          '--ck-secondary-button-border-radius': '0px',
          '--ck-secondary-button-box-shadow': `0 0 0 2px ${secondaryColor}`,
          '--ck-secondary-button-hover-color': '#0e0e0e',

          '--ck-tooltip-background': '#0e0e0e',
          '--ck-tooltip-border-radius': '0px',
          '--ck-tooltip-shadow': `0 0 0 2px ${primaryColor}`,
        }}
      >
        <Body />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
