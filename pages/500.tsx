import Page from '@/components/Page';
import { AppProps } from '@/utils/types';
import Token from '@/views/token';

export default function TokenPage(props: AppProps) {
  return (
    <Page>
      <Token tokenId={500} {...props} />
    </Page>
  );
}
