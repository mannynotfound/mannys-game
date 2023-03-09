import Button from '@/components/Button';
import type { TokenId } from '@/utils/types';

type Props = {
  tokenId: TokenId;
};

export default function OptionSave({ tokenId }: Props) {
  return (
    <div className="flex w-full justify-between items-between">
      <Button
        onClick={() => {
          const canvas = document.querySelector('canvas');
          if (canvas === null) {
            console.warn('Couldnt find canvas element...');
            return;
          }
          canvas.getContext('experimental-webgl', {
            preserveDrawingBuffer: true,
          });
          const image = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
          const link = document.createElement('a');
          link.style.cssText = 'position: absolute';
          link.href = image;
          link.setAttribute('download', `${tokenId}.png`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        <div className="mt-1">SAVE .PNG</div>
      </Button>
      <Button
        onClick={() => {
          const canvas = document.querySelector('canvas');
          if (canvas === null) {
            console.warn('Couldnt find canvas...');
            return;
          }
          canvas.getContext('experimental-webgl', {
            preserveDrawingBuffer: true,
          });

          const destinationCanvas = document.createElement('canvas');
          destinationCanvas.width = canvas.width;
          destinationCanvas.height = canvas.height;
          const destCtx = destinationCanvas.getContext('2d');
          if (destCtx === null) {
            console.warn('Couldnt get canvas context 2d...');
            return;
          }
          const threeContainer = document.querySelector('.three-container');
          if (threeContainer === null) {
            console.warn('Couldnt find three container...');
            return;
          }
          const styles = window.getComputedStyle(threeContainer);
          const currentBg = styles.getPropertyValue('background-color');
          destCtx.fillStyle = currentBg;
          destCtx.fillRect(0, 0, canvas.width, canvas.height);

          destCtx.drawImage(canvas, 0, 0);
          destinationCanvas.getContext('experimental-webgl', {
            preserveDrawingBuffer: true,
          });

          const image = destinationCanvas
            .toDataURL('image/jpeg')
            .replace('image/jpeg', 'image/octet-stream');

          const link = document.createElement('a');

          link.style.cssText = 'position: absolute';
          link.href = image;
          link.setAttribute('download', `${tokenId}.jpg`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        <div className="mt-1">SAVE .JPG</div>
      </Button>
    </div>
  );
}
