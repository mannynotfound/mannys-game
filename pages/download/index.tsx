import Page from '@/components/Page';
import { AppProps } from '@/utils/types';
import Download from '@/views/download';

export default function DownloadPage(props: AppProps) {
  return (
    <Page>
      <Download {...props} />
    </Page>
  );
}
