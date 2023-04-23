import { ParsedUrlQuery } from 'querystring';
import Page from '@/components/Page';
import gamerPlaques from '@/fixtures/gamer-plaques.json';
import PlaqueViewer from '@/views/plaque';

export type Props = {
  name: string;
  address: string;
  dateEarned: number;
  posX: number;
  posY?: number;
  size?: number;
};

type PlaquesMap = {
  [tokenId: string]: Props;
};

const gamerMap: PlaquesMap = gamerPlaques;

function PlaqueViewPage(props: Props) {
  return (
    <Page className="pt-0" hideHeader>
      <PlaqueViewer {...props} />
    </Page>
  );
}

PlaqueViewPage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  const tokenStr = query.tokenId?.toString() ?? '0';
  const gamerMatch = Object.keys(gamerMap).find((gm) => gm === tokenStr) ?? '';
  return gamerMap[gamerMatch];
};

export default PlaqueViewPage;
