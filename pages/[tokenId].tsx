import Page from '@/components/Page';
import Token from '@/views/token';
import type { ParsedUrlQuery } from 'querystring';
import type { AppProps, TokenId } from '@/utils/types';
import { getTokenProps } from '@/utils';

function TokenPage(props: AppProps & { tokenId: TokenId }) {
  return (
    <Page>
      <Token {...props} />
    </Page>
  );
}

TokenPage.getInitialProps = async ({ query }: { query: ParsedUrlQuery }) => {
  const tokenStr = query.tokenId?.toString() ?? '0';
  const tokenMatch = getTokenProps(parseInt(tokenStr, 10));
  const tokenId = tokenMatch?.tokenId;

  return { tokenId };
};

export default TokenPage;
