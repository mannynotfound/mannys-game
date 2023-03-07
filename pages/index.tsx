import Page from '@/components/Page';
import Home from '@/views/home';
import { AppProps } from '@/utils/types';

export default function HomePage(appProps: AppProps) {
  return (
    <Page>
      <Home web3={appProps.web3} mannys={appProps.mannys} />
    </Page>
  );
}
