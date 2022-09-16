import {
  useAccount,
  useEnsName,
  useEnsAvatar,
  useDisconnect,
  useContract,
  useProvider,
} from 'wagmi';

import { MANNY_CONTRACT, MANNY_ABI } from 'constants';

export default function useWeb3() {
  const accountData = useAccount();
  const { data: name } = useEnsName({ address: accountData?.address });
  const { data: avatar } = useEnsAvatar({ addressOrName: name ?? '' });
  const account = {
    ...accountData,
    ens: { name, avatar },
  };
  const { disconnect } = useDisconnect();
  const provider = useProvider();
  const mannyContract = useContract({
    addressOrName: MANNY_CONTRACT,
    contractInterface: MANNY_ABI,
    signerOrProvider: provider,
  });

  return {
    account,
    disconnect,
    mannyContract,
    provider,
  };
}
