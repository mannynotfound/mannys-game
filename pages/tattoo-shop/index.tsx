import Page from '@/components/Page';
import { AppProps } from '@/utils/types';
import TattooShop from '@/views/tattoo-shop';

export default function TattooPage(props: AppProps) {
  return (
    <Page>
      <TattooShop {...props} />
    </Page>
  );
}
