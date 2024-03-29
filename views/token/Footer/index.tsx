import Chat from '@/components/Chat';
import type { Account, Token, TokenId } from '@/utils/types';
import Info from '@/views/token/Footer/Info';
import ToolsMenu from '@/views/token/Tools/Menu';

type Props = {
  account: Account;
  mannys: Token[];
  bagOpen: boolean;
  cameraOpen: boolean;
  tokenId: TokenId;
  zoomedIn: boolean;
};

export default function Footer({
  account,
  mannys,
  bagOpen,
  cameraOpen,
  tokenId,
  zoomedIn,
}: Props) {
  return (
    <div className="fixed left-0 bottom-0 p-8 w-full flex h-[200px]">
      <div className="flex-1 pr-8 select-none">
        {!zoomedIn && <Chat account={account} mannys={mannys} />}
      </div>
      {!zoomedIn && (
        <div
          className={`flex-1 flex items-center justify-center text-center select-none`}
        >
          <Info tokenId={tokenId} account={account} />
        </div>
      )}
      <div className="flex-1 flex items-center text-right">
        <ToolsMenu
          tokenId={tokenId}
          cameraOpen={cameraOpen}
          bagOpen={bagOpen}
        />
      </div>
    </div>
  );
}
