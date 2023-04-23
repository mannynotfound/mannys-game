import Page from '@/components/Page';
import { AppProps } from '@/utils/types';
import Home from '@/views/home';

export default function HomePage(appProps: AppProps) {
  return (
    <Page>
      <Home web3={appProps.web3} mannys={appProps.mannys} />
    </Page>
  );
}
