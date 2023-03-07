import Page from '@/components/Page';
import TattooShop from '@/views/tattoo-shop';
import { AppProps } from '@/utils/types';

export default function TattooPage(props: AppProps) {
  return (
    <Page>
      <TattooShop {...props} />
    </Page>
  );
}
