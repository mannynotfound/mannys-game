import { useState, useEffect, useRef, Dispatch, SyntheticEvent } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import type { Crop } from 'react-image-crop/dist/types';
import { TokenId } from '@/utils/types';

const getCanvasImage = (useTransparent: boolean) => {
  const canvas = document.querySelector('canvas');
  if (canvas === null) {
    console.warn(`Couldn't find an existing canvas...`);
    return;
  }

  canvas.getContext('experimental-webgl', {
    preserveDrawingBuffer: true,
  });

  const destinationCanvas = document.createElement('canvas');
  destinationCanvas.width = canvas?.width ?? 0;
  destinationCanvas.height = canvas?.height ?? 0;
  const destCtx = destinationCanvas.getContext('2d');
  if (destCtx === null) {
    console.warn(`Couldn't create canvas context 2d...`);
    return;
  }
  const threeContainer = document.querySelector('.three-container');
  if (!useTransparent && threeContainer !== null) {
    const styles = window.getComputedStyle(threeContainer);
    const currentBg = styles.getPropertyValue('background-color');
    destCtx.fillStyle = currentBg;
    destCtx.fillRect(0, 0, destinationCanvas.width, destinationCanvas.height);
  }

  destCtx.drawImage(canvas, 0, 0);
  destinationCanvas.getContext('experimental-webgl', {
    preserveDrawingBuffer: true,
  });

  const imgType = useTransparent ? 'image/png' : 'image/jpeg';
  const image = destinationCanvas.toDataURL(imgType);

  return image;
};

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) =>
  centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );

type CanvasImagesState = {
  [key: string]: string;
};

type Props = {
  tokenId: TokenId;
  setCompletedCrop: Dispatch<Crop>;
  canvasImages: CanvasImagesState | undefined;
  setCanvasImages: Dispatch<CanvasImagesState>;
  useTransparent: boolean;
};

export default function PreviewImage({
  tokenId,
  setCompletedCrop,
  canvasImages,
  setCanvasImages,
  useTransparent,
}: Props) {
  const aspect = 1;
  const imgRef = useRef(null);
  const [crop, setCrop] = useState<Crop>();

  useEffect(() => {
    const image = getCanvasImage(useTransparent);
    if (image !== undefined) {
      setCanvasImages({
        ...canvasImages,
        [tokenId]: image,
      });
    }
  }, [tokenId, useTransparent]);

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (aspect && crop === undefined) {
      const { width, height } = e.currentTarget;
      const initialCrop = centerAspectCrop(width, height, aspect);
      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    }
  };

  return (
    <ReactCrop
      className="bg-black"
      crop={crop}
      onChange={(_, percentCrop) => setCrop(percentCrop)}
      onComplete={(c) => setCompletedCrop(c)}
      aspect={aspect}
      keepSelection
    >
      <img
        id="crop-image"
        ref={imgRef}
        alt="canvas crop"
        src={canvasImages?.[tokenId]}
        onLoad={onImageLoad}
        className=""
      />
    </ReactCrop>
  );
}
