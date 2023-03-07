import Page from '@/components/Page';
import Download from '@/views/download';
import { AppProps } from '@/utils/types';

export default function DownloadPage(props: AppProps) {
  return (
    <Page>
      <Download {...props} />
    </Page>
  );
}
