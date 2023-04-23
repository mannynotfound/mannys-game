import {
  useAccount,
  useContract,
  useEnsAvatar,
  useEnsName,
  useProvider,
} from 'wagmi';
import { MANNY_ABI, MANNY_CONTRACT } from 'utils/constants';

export default function useWeb3() {
  const accountData = useAccount();
  const { data: name } = useEnsName({ address: accountData?.address });
  const { data: avatar } = useEnsAvatar({ address: accountData?.address });
  const account = {
    ...accountData,
    ens: { name, avatar },
  };
  const provider = useProvider();
  const mannyContract = useContract({
    address: MANNY_CONTRACT,
    abi: MANNY_ABI,
    signerOrProvider: provider,
  });

  return {
    account,
    mannyContract,
  };
}
