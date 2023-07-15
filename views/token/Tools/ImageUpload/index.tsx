import { useState } from 'react';
import type { Crop } from 'react-image-crop/dist/types';
import { useSignMessage } from 'wagmi';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import { useAppDispatch } from '@/views/token/hooks';
import { API_URL } from '@/utils/constants';
import type { TokenId } from '@/utils/types';
import { createCroppedImage } from '@/views/token/Tools/ImageUpload/utils';
import PreviewImage from '@/views/token/Tools/ImageUpload/PreviewImage';
import { closeImageUpload } from '../../reducer';

type CanvasImagesState = {
  [key: string]: string;
};

type SubmitState = {
  type: string;
  message: string;
};

type Props = {
  tokenId: TokenId;
  saveUserMetadata: (sig: `0x${string}`) => Promise<void | Response>;
};

const ImageUpload = ({ tokenId, saveUserMetadata }: Props) => {
  const dispatch = useAppDispatch();
  const [canvasImages, setCanvasImages] = useState<CanvasImagesState>();
  const [useTransparent, setUseTransaprent] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitState>();
  const { signMessageAsync } = useSignMessage();

  const onImageUpload = async () => {
    setIsUploadingImage(true);
    const image = document.getElementById('crop-image') as HTMLImageElement;
    if (image === null) {
      console.warn(`Couldnt find crop image...`);
      return;
    }
    const file = await createCroppedImage(image, completedCrop);
    if (file === undefined) {
      console.warn(`Couldnt create cropped file for ${tokenId}...`);
      return;
    }

    const signature = await signMessageAsync({
      message: `Saving manny #${tokenId}`,
    }).catch(console.error);

    if (!signature) {
      setIsUploadingImage(false);
      return;
    }

    // add data to form
    const data = new FormData();
    data.append('token', tokenId.toString());
    data.append('sig', signature);
    data.append('file', file);

    fetch(`${API_URL}/nft/image-upload`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: data,
    })
      .then(async (resp) => {
        const respJson = await resp.json();
        return {
          status: resp.status,
          ...respJson,
        };
      })
      .then(async (json) => {
        const savedMetadataResp = await saveUserMetadata(signature);
        console.log('SAVED METADATA RESPONSE!', savedMetadataResp);

        setSubmitResponse({
          type: json.status === 200 ? 'success' : 'failure',
          message: json.message,
        });
        setIsUploadingImage(false);
      })
      .catch((error) => {
        setSubmitResponse({
          type: 'failure',
          message: String(error),
        });
        setIsUploadingImage(false);
      });
  };

  if (submitResponse?.message) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="flex flex-col w-auto text-white">
          <p>{submitResponse.message}</p>
          <Button
            onClick={() =>
              dispatch(
                closeImageUpload({
                  tokenId,
                })
              )
            }
            color="yellow"
            className="w-auto text-center"
          >
            <div className="mt-1 px-6 text-lg font-bold">OK</div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="z-10 w-1/2">
        <div className="w-full relative h-auto">
          <PreviewImage
            tokenId={tokenId}
            useTransparent={useTransparent}
            canvasImages={canvasImages}
            setCanvasImages={setCanvasImages}
            setCompletedCrop={setCompletedCrop}
          />
        </div>
        <div className="flex w-full justify-center">
          <div className="flex justify-between items-center px-4 py-2 text-white bg-gray-dark mr-4 border border-white">
            <b className="mt-1 mr-2">TRANSPARENT</b>
            <div>
              <ToggleSwitch
                id="image-upload-bg"
                name="image-upload-bg"
                checked={useTransparent}
                onChange={() => setUseTransaprent(!useTransparent)}
                disabled={false}
              />
            </div>
          </div>
          <Button
            onClick={isUploadingImage ? undefined : onImageUpload}
            color="yellow"
            className="w-auto bg-gray-dark flex items-center"
          >
            <div className="px-6 text-lg font-bold">SAVE NFT</div>
          </Button>
        </div>
      </div>
      <div
        className="absolute inset-0 z-0"
        onClick={() => dispatch(closeImageUpload({ tokenId }))}
      />
    </div>
  );
};

export default ImageUpload;
