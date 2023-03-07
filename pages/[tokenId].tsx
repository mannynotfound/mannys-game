import Page from '@/components/Page';
import Token from '@/views/token';
import { AppProps } from '@/utils/types';

export default function TokenPage(props: AppProps) {
  return (
    <Page>
      <Token {...props} />
    </Page>
  );
}
