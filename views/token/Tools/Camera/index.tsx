import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch } from '@/views/token/hooks';
import type { Account, TokenId } from '@/utils/types';
import OptionBackground from '@/views/token/Tools/Camera/OptionBackground';
import OptionEditNFT from '@/views/token/Tools/Camera/OptionEditNFT';
import OptionMood from '@/views/token/Tools/Camera/OptionMood';
import OptionPaused from '@/views/token/Tools/Camera/OptionPaused';
import OptionSave from '@/views/token/Tools/Camera/OptionSave';
import OptionSaveNFT from '@/views/token/Tools/Camera/OptionSaveNFT';
import OptionTextureHD from '@/views/token/Tools/Camera/OptionTextureHD';
import OptionZoomed from '@/views/token/Tools/Camera/OptionZoomed';
import { toggleCameraOpen } from '@/views/token/reducer';

type Props = {
  cameraOpen: boolean;
  account: Account;
  tokenId: TokenId;
  mood: string;
  bgColor: string;
  zoomedIn: boolean;
  paused: boolean;
  textureHD: boolean;
  saveUserMetadata: () => void;
};

export default function Camera({
  cameraOpen,
  account,
  tokenId,
  mood,
  bgColor,
  zoomedIn,
  paused,
  textureHD,
  saveUserMetadata,
}: Props) {
  const dispatch = useAppDispatch();
  const cameraItems: [React.ElementType, Partial<Props>][] = [
    [OptionMood, { account, tokenId, mood }],
    [OptionBackground, { tokenId, bgColor }],
    [OptionZoomed, { tokenId, zoomedIn }],
    [OptionTextureHD, { tokenId, textureHD }],
    [OptionPaused, { tokenId, paused }],
    [OptionSave, { tokenId }],
    [OptionEditNFT, { tokenId }],
    [OptionSaveNFT, { saveUserMetadata }],
  ];
  return (
    <AnimatePresence>
      {cameraOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0, transition: { delay: 0.2 } }}
          transition={{ duration: 0.25 }}
          className="max-w-[446px] w-full overflow-hidden px-8"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0, transition: { delay: 0.2 } }}
            transition={{ duration: 0.25 }}
            className="border p-4 pt-[45px] border-green rounded-md relative z-10 flex flex-col gap-y-2 float-right"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.4 } }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-0 right-0 text-yellow cursor-pointer z-0"
              onClick={() =>
                dispatch(
                  toggleCameraOpen({
                    tokenId,
                    value: false,
                  })
                )
              }
            >
              <div className="px-4 py-1 text-2xl font-bold">x</div>
            </motion.button>
            {cameraItems.map(([Component, props], i) => (
              <div
                className="flex items-center w-full h-[32px]"
                key={`ci-${i}`}
              >
                <motion.div
                  className="w-full"
                  initial={{ scale: 0, transformOrigin: 'right' }}
                  animate={{ scale: 1, transition: { delay: 0.2 } }}
                  exit={{ scale: 0 }}
                >
                  <Component {...props} />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
