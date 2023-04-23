import { ParsedUrlQuery } from 'querystring';
import Page from '@/components/Page';
import { getTokenProps } from '@/utils';
import TokenViewer from '@/views/view';

type Props = {
  textureUrl?: string;
  animationName?: string;
};

function ViewPage({ textureUrl, animationName }: Props) {
  return (
    <Page className="pt-0 bg-white text-green" hideHeader>
      <TokenViewer textureUrl={textureUrl} animationName={animationName} />
    </Page>
  );
}

ViewPage.getInitialProps = async ({ query }: { query: ParsedUrlQuery }) => {
  const tokenStr = query.tokenId?.toString() ?? '0';
  const tokenMatch = getTokenProps(parseInt(tokenStr, 10));
  const textureUrl = tokenMatch?.textureUrl;
  const animationName = tokenMatch?.animationName;

  return { textureUrl, animationName };
};

export default ViewPage;
