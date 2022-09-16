import { withRouter } from 'react-router-dom';
import { useEnsName } from 'wagmi';

import { Address } from 'components';
import { useTokenOwner } from 'hooks';
import { parseToken } from 'utils';

const TokenInfo = ({ account, mannyContract, ...props }) => {
  const { tokenId } = parseToken(props);
  if (!tokenId) {
    const input = props?.match?.params?.tokenId;
    return <div className="text-white">Manny #{input} not found...</div>;
  }
  const tokenOwner = useTokenOwner(mannyContract, tokenId);
  const { data: name } = useEnsName({ address: tokenOwner });

  const ens = { name };

  return (
    <div className="text-xl text-green leading-tight">
      <h2 className="text-2xl text-white">
        <b className="border-b border-white pb-2 mb-2 inline-block">
          Manny #{tokenId}
        </b>
      </h2>
      {tokenOwner && (
        <div className="TokenOwner">
          owned by{' '}
          <Address
            color="yellow"
            account={{
              address: tokenOwner,
              ens,
            }}
            size="short"
            isYou={tokenOwner === account?.address}
            link={`https://opensea.io/assets/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9/${tokenId}`}
          />
        </div>
      )}
    </div>
  );
};

export default withRouter((props) => <TokenInfo {...props} />);
