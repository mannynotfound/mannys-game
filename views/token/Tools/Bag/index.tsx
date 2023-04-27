import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch } from '@/views/token/hooks';
import type { Account, TokenId } from '@/utils/types';
import AccessoryItems from '@/views/token/Tools/Bag/AccessoryItems';
import Tooltip, { BagTooltip } from '@/views/token/Tools/Bag/Tooltip';
import { TokenState, toggleBagOpen } from '@/views/token/reducer';

type Props = {
  bagOpen: boolean;
  tokenId: TokenId;
  account: Account;
  accessories: TokenState['accessories'];
};

export default function Bag({ bagOpen, tokenId, account, accessories }: Props) {
  const dispatch = useAppDispatch();
  const [tooltip, setTooltip] = useState<BagTooltip>();

  return (
    <AnimatePresence>
      {bagOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0, transition: { delay: 0.2 } }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-[446px] overflow-hidden px-8"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0, transition: { delay: 0.2 } }}
            transition={{ duration: 0.25 }}
            className="border p-4 border-green rounded-md relative flex flex-col gap-y-2 float-right"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.4 } }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-0 right-0 text-yellow cursor-pointer"
              onClick={() =>
                dispatch(
                  toggleBagOpen({
                    tokenId,
                    value: false,
                  })
                )
              }
            >
              <div className="px-4 py-1 text-2xl font-bold">x</div>
            </motion.button>
            <AccessoryItems
              tokenId={tokenId}
              account={account}
              accessories={accessories}
              setTooltip={setTooltip}
            />
            <Tooltip tooltip={tooltip} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
