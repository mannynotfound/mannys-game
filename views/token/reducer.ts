import type {
  TokenPageState,
  TokenState,
  TokenStateAction,
} from '@/views/token/types';

export const initialState: TokenState = {
  bagOpen: false,
  cameraOpen: false,
  imageUploadOpen: false,
  questMode: undefined,
  accessories: undefined,
  mood: 'idle',
  camera: {
    zoomedIn: false,
    paused: false,
    bgColor: '#0e0e0e',
  },
  useTextureHD: false,
};

export default (
  state: TokenPageState,
  action: TokenStateAction
): TokenPageState => {
  const { tokenId, payload } = action;
  const tokenState = state[tokenId] ?? initialState;
  const nextTokenState = {
    ...tokenState,
  };

  switch (action.type) {
    case 'SET_BAG_OPEN':
      nextTokenState.bagOpen = payload;
      nextTokenState.cameraOpen = false;
      break;
    case 'SET_CAMERA_OPEN':
      nextTokenState.cameraOpen = payload;
      nextTokenState.bagOpen = false;
      break;
    case 'OPEN_IMAGE_UPLOAD':
      nextTokenState.cameraOpen = false;
      nextTokenState.bagOpen = false;
      nextTokenState.imageUploadOpen = true;
      break;
    case 'CLOSE_IMAGE_UPLOAD':
      nextTokenState.imageUploadOpen = false;
      break;
    case 'SET_MOOD':
      nextTokenState.mood = payload.mood;
      break;
    case 'SET_ZOOM':
      nextTokenState.camera = {
        ...nextTokenState.camera,
        zoomedIn: payload.zoomedIn,
        paused: payload.zoomedIn ? true : nextTokenState.camera.paused,
      };
      nextTokenState.mood = payload.zoomedIn ? 'idle' : nextTokenState.mood;
      // load HD texture after any zoom
      if (!nextTokenState.useTextureHD) {
        nextTokenState.useTextureHD = true;
      }
      break;
    case 'SET_PAUSED':
      nextTokenState.camera = {
        ...nextTokenState.camera,
        paused: payload.paused,
      };
      break;
    case 'SET_BG_COLOR':
      nextTokenState.camera = {
        ...nextTokenState.camera,
        bgColor: payload.bgColor,
      };
      break;
    case 'TOGGLE_ACCESSORY':
      if (nextTokenState.accessories === undefined) {
        nextTokenState.accessories = {};
      }
      const { id, slot }: { id: string; slot: string } = payload;
      let newAccessories = nextTokenState.accessories?.[slot] ?? [];
      if (newAccessories.includes(id)) {
        newAccessories = newAccessories.filter((acc) => acc !== id);
      } else {
        newAccessories = [id];
      }
      nextTokenState.accessories = {
        ...nextTokenState.accessories,
        [slot]: newAccessories,
      };
      break;
    case 'SET_QUEST_MODE':
      const { quest } = payload;
      nextTokenState.bagOpen =
        quest.id === 'toadz' ? false : nextTokenState.bagOpen;
      nextTokenState.cameraOpen = false;
      nextTokenState.questMode =
        nextTokenState.questMode === quest.id ? undefined : quest.id;
      break;
    default:
      break;
  }

  return {
    ...state,
    [tokenId]: nextTokenState,
  };
};
