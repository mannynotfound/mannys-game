import { useState, useEffect, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { useSignMessage } from 'wagmi';

import { Button, ToggleSwitch } from 'components';
import 'react-image-crop/dist/ReactCrop.css';

const getCanvasImage = (useTransparent) => {
  const canvas = document.querySelector('canvas');
  canvas.getContext('experimental-webgl', {
    preserveDrawingBuffer: true,
  });

  const destinationCanvas = document.createElement('canvas');
  destinationCanvas.width = canvas.width;
  destinationCanvas.height = canvas.height;
  const destCtx = destinationCanvas.getContext('2d');
  if (!useTransparent) {
    const styles = window.getComputedStyle(
      document.querySelector('.three-container')
    );
    const currentBg = styles.getPropertyValue('background-color');
    destCtx.fillStyle = currentBg;
    destCtx.fillRect(0, 0, canvas.width, canvas.height);
  }

  destCtx.drawImage(canvas, 0, 0);
  destinationCanvas.getContext('experimental-webgl', {
    preserveDrawingBuffer: true,
  });

  const imgType = useTransparent ? 'image/png' : 'image/jpeg';

  const image = destinationCanvas.toDataURL(imgType);

  return image;
};

const createCroppedImage = async (image, crop) => {
  if (crop.unit === '%') {
    const pixelWidth = Math.floor((image.width / 100) * crop.width);
    const pixelHeight = Math.floor((image.height / 100) * crop.height);
    const pixelX = Math.floor((image.width / 100) * crop.x);
    const pixelY = Math.floor((image.height / 100) * crop.y);
    crop = {
      width: pixelWidth,
      height: pixelHeight,
      x: pixelX,
      y: pixelY,
    };
  }
  // const canvas = document.createElement("canvas");
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
  newCtx.drawImage(canvas, 0, 0, 512, 512);
  const dataURL = newCanvas.toDataURL();
  return dataURL;
};

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) =>
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

const PreviewImage = (props) => {
  const {
    tokenId,
    setCompletedCrop,
    canvasImages,
    setCanvasImages,
    useTransparent,
  } = props;
  const aspect = 1;
  const imgRef = useRef();
  const [crop, setCrop] = useState({});

  useEffect(() => {
    const image = getCanvasImage(useTransparent);

    setCanvasImages({
      ...canvasImages,
      [tokenId]: image,
    });
  }, [tokenId, useTransparent]);

  const onImageLoad = (e) => {
    if (aspect && !crop.unit) {
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
};

const ImageUpload = (props) => {
  const { tokenId } = props;
  const [canvasImages, setCanvasImages] = useState({});
  const [useTransparent, setUseTransaprent] = useState(false);
  const [completedCrop, setCompletedCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({});
  const { signMessageAsync } = useSignMessage();

  const onImageUpload = async () => {
    setIsUploadingImage(true);
    const image = document.getElementById('crop-image');
    const file = await createCroppedImage(image, completedCrop);

    const signature = await signMessageAsync({
      message: `Uploading image for manny #${tokenId}`,
    }).catch(console.error);

    if (!signature) {
      setIsUploadingImage(false);
      return;
    }

    // add data to form
    const data = new FormData();
    data.append('token', tokenId);
    data.append('sig', signature);
    data.append('file', file);

    const fetchUrl = window.location.host.includes('localhost')
      ? 'http://localhost:3001'
      : 'https://mannys-game-server.herokuapp.com';

    fetch(`${fetchUrl}/api/nft/image-upload`, {
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
      .then((json) => {
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
          <p>{submitResponse?.message}</p>
          <Button
            onClick={() => {
              props.dispatch({
                type: 'CLOSE_IMAGE_UPLOAD',
              });
            }}
            color="yellow"
            className="w-auto text-center"
          >
            <div className="mt-1 px-6 text-lg">
              <b>OK</b>
            </div>
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
            useTransparent={useTransparent}
            canvasImages={canvasImages}
            setCanvasImages={setCanvasImages}
            setCompletedCrop={setCompletedCrop}
            {...props}
          />
        </div>
        <div className="flex w-full justify-center">
          <div className="flex justify-between items-center px-4 text-black bg-white mr-4">
            <b className="mt-1 mr-2">TRANSPARENT</b>
            <div>
              <ToggleSwitch
                id="image-upload-bg"
                name="image-upload-bg"
                checked={useTransparent}
                onChange={() => {
                  setUseTransaprent(!useTransparent);
                }}
                disabled={false}
              />
            </div>
          </div>
          <Button
            onClick={isUploadingImage ? () => {} : onImageUpload}
            bgColor="yellow"
            color="yellow"
            textColor="grey"
            className="w-auto"
          >
            <div className="mt-1 px-6 text-lg">
              <b>SET NFT IMAGE</b>
            </div>
          </Button>
        </div>
      </div>
      <div
        className="absolute inset-0 z-0"
        onClick={() => {
          props.dispatch({ type: 'CLOSE_IMAGE_UPLOAD' });
        }}
      />
    </div>
  );
};

export default ImageUpload;
