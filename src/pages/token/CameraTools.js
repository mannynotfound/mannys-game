import { parseToken } from 'utils';
import { useLoot } from 'hooks';
import { ToggleSwitch, Button } from 'components';

const CameraTools = (props) => {
  const { account, provider, tokenId, mood, bgColor, zoomedIn, paused } = props;
  const { bonusAnimName } = parseToken(props);
  const { lootBalance: hasLoot, mLootBalance: hasMLoot } = useLoot(
    provider,
    account?.address
  );

  return (
    <div
      className="absolute right-0 px-8 text-green select-none"
      style={{
        bottom: 200,
        width: '100%',
        maxWidth: 320,
      }}
    >
      <div className="border p-4 border-green rounded-md relative z-10">
        <div
          className="absolute top-0 right-0 text-yellow cursor-pointer z-0"
          onClick={() => {
            props.dispatch({ type: 'SET_CAMERA_OPEN', payload: false });
          }}
        >
          <div className="p-4 pb-0 text-2xl">
            <b>X</b>
          </div>
        </div>
        <div className="text-white text-xl mb-4">
          <b>Camera</b>
        </div>
        <div className="flex w-full justify-between mb-2">
          <div className="flex items-center">
            <b>MOOD</b>
          </div>
          <div>
            <select
              className="text-black p-1 text-right"
              style={{
                fontFamily: 'Courier, monospace',
                maxWidth: 170,
              }}
              value={mood}
              onChange={(e) => {
                props.dispatch({
                  type: 'SET_MOOD',
                  payload: {
                    tokenId,
                    mood: e.target.value,
                  },
                });
              }}
            >
              <option>idle</option>
              {bonusAnimName && <option>{bonusAnimName}</option>}
              <option
                title="Requires mLoot/Loot NFT."
                disabled={!hasMLoot && !hasLoot}
              >
                spellcast
              </option>
              <option
                title="Requires mLoot/Loot NFT."
                disabled={!hasMLoot && !hasLoot}
              >
                inward slash
              </option>
              <option
                title="Requires mLoot/Loot NFT."
                disabled={!hasMLoot && !hasLoot}
              >
                downward swing
              </option>
              <option
                title="Requires mLoot/Loot NFT."
                disabled={!hasMLoot && !hasLoot}
              >
                thrust
              </option>
              <option
                title="Requires mLoot/Loot NFT."
                disabled={!hasMLoot && !hasLoot}
              >
                horizontal swing
              </option>
              <option
                title="Requires mLoot/Loot NFT."
                disabled={!hasMLoot && !hasLoot}
              >
                sword run
              </option>
              <option title="Requires Loot NFT." disabled={!hasLoot}>
                spellcast 2h
              </option>
              <option title="Requires Loot NFT." disabled={!hasLoot}>
                battlecry
              </option>
            </select>
          </div>
        </div>
        <div className="flex w-full justify-between mb-2">
          <div className="flex items-center">
            <b>BACKGROUND</b>
          </div>
          <div>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => {
                props.dispatch({
                  type: 'SET_BG_COLOR',
                  payload: {
                    tokenId,
                    bgColor: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="flex w-full justify-between mb-2">
          <div className="flex items-center">
            <b>PFP MODE</b>
          </div>
          <div>
            <ToggleSwitch
              id="pfp-mode"
              name="pfp-mode"
              checked={zoomedIn || false}
              onChange={() => {
                props.dispatch({
                  type: 'SET_ZOOM',
                  payload: {
                    tokenId,
                    zoomedIn: !zoomedIn,
                  },
                });
              }}
              disabled={false}
            />
          </div>
        </div>
        <div className="flex w-full justify-between mb-4">
          <div className="flex items-center">
            <b>PAUSED</b>
          </div>
          <div>
            <ToggleSwitch
              id="paused"
              name="paused"
              checked={paused || false}
              onChange={() => {
                props.dispatch({
                  type: 'SET_PAUSED',
                  payload: {
                    tokenId,
                    paused: !paused,
                  },
                });
              }}
              disabled={false}
            />
          </div>
        </div>
        <div className="flex w-full justify-between items-between mb-2">
          <Button
            onClick={() => {
              const canvas = document.querySelector('canvas');
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
              canvas.getContext('experimental-webgl', {
                preserveDrawingBuffer: true,
              });

              const destinationCanvas = document.createElement('canvas');
              destinationCanvas.width = canvas.width;
              destinationCanvas.height = canvas.height;
              const destCtx = destinationCanvas.getContext('2d');
              const styles = window.getComputedStyle(
                document.querySelector('.three-container')
              );
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
        <div className="flex w-full">
          <Button
            className="w-full text-center mt-2"
            color="yellow"
            onClick={() => {
              props.dispatch({ type: 'OPEN_IMAGE_UPLOAD' });
            }}
          >
            <div className="mt-1">EDIT NFT IMAGE</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraTools;
