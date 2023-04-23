import Page from '@/components/Page';
import { AppProps } from '@/utils/types';
import Oncyber from '@/views/oncyber';

export default function OnCyberPage(props: AppProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center">
        <video src="/videos/oncyberslideshow.mp4" autoPlay muted loop />
      </div>
      <Page className="max-w-xl flex justify-center items-center">
        <Oncyber {...props} />
      </Page>
    </>
  );
}
