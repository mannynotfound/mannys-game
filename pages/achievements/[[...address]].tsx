import Page from '@/components/Page';
import { AppProps } from '@/utils/types';
import Achievements from '@/views/achievements';

export default function AchievementsPage(props: AppProps) {
  return (
    <Page>
      <Achievements {...props} />
    </Page>
  );
}
