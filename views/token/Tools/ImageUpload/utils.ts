import type { Crop } from 'react-image-crop/dist/types';

export const createCroppedImage = async (
  image: HTMLImageElement,
  crop: Crop
) => {
  if (crop.unit === '%') {
    const pixelWidth = Math.floor((image.width / 100) * crop.width);
    const pixelHeight = Math.floor((image.height / 100) * crop.height);
    const pixelX = Math.floor((image.width / 100) * crop.x);
    const pixelY = Math.floor((image.height / 100) * crop.y);
    crop = {
      unit: 'px',
      width: pixelWidth,
      height: pixelHeight,
      x: pixelX,
      y: pixelY,
    };
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  if (ctx === null) {
    console.warn(`Couldnt get canvas context 2d...`);
    return;
  }

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();

  // force cropped image into a 512x512 canvas
  const newCanvas = document.createElement('canvas');
  newCanvas.height = 512;
  newCanvas.width = 512;
  const newCtx = newCanvas.getContext('2d');
  if (newCtx === null) {
    console.warn('Couldnt create canvas context...');
    return;
  }
  newCtx.drawImage(canvas, 0, 0, 512, 512);
  const dataURL = newCanvas.toDataURL();
  return dataURL;
};
