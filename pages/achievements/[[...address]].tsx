import Page from '@/components/Page';
import Achievements from '@/views/achievements';
import { AppProps } from '@/utils/types';

export default function AchievementsPage(props: AppProps) {
  return (
    <Page>
      <Achievements {...props} />
    </Page>
  );
}
