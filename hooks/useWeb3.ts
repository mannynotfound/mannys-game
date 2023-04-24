import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

export default function useWeb3() {
  const accountData = useAccount();
  const { data: name } = useEnsName({ address: accountData?.address });
  const { data: avatar } = useEnsAvatar({ address: accountData?.address });
  const account = {
    ...accountData,
    ens: { name, avatar },
  };

  return {
    account,
  };
}
