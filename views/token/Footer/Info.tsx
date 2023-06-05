import { useRouter } from 'next/router';
import { useEnsName } from 'wagmi';
import useHasMounted from '@/hooks/useHasMounted';
import useTokenOwner from '@/hooks/useTokenOwner';
import type { Account, EthAddress, TokenId } from '@/utils/types';

type OwnerProps = {
  account: Account;
  tokenId: TokenId;
  tokenOwner: EthAddress;
};

const Owner = ({ account, tokenId, tokenOwner }: OwnerProps) => {
  const { data: name } = useEnsName({ address: tokenOwner });
  if (tokenOwner === undefined) {
    return null;
  }
  let displayAddress = tokenOwner.substring(0, 6);
  displayAddress += '...' + tokenOwner.substring(tokenOwner.length - 4);
  if (name) {
    displayAddress = name;
  }
  if (tokenOwner === account.address) {
    displayAddress = 'you';
  }

  return (
    <div className="TokenOwner">
      owned by{' '}
      <a
        target="_blank"
        href={`https://opensea.io/assets/0x2bd58a19c7e4abf17638c5ee6fa96ee5eb53aed9/${tokenId}`}
        rel="noopener noreferrer"
        className="text-green"
      >
        {displayAddress}
      </a>
    </div>
  );
};

type Props = {
  account: Account;
  tokenId: TokenId;
};

export default function Info({ account, tokenId }: Props) {
  const router = useRouter();
  const tokenOwner = useTokenOwner(tokenId);
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  if (!tokenId) {
    const input = router.query.tokenId;
    return (
      <div className="text-white text-2xl">Manny #{input} not found...</div>
    );
  }

  return (
    <div className="text-xl text-green leading-tight">
      <h2 className="text-2xl text-yellow">
        <b className="border-b border-white pb-2 mb-2 inline-block">
          Manny #{tokenId}
        </b>
      </h2>
      {tokenOwner !== undefined && (
        <Owner tokenId={tokenId} account={account} tokenOwner={tokenOwner} />
      )}
    </div>
  );
}
