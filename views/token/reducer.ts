import { TokenId } from '@/utils/types';

export interface TokenState {
  bagOpen: boolean;
  cameraOpen: boolean;
  imageUploadOpen: boolean;
  questMode?: string;
  accessories?: {
    [slot: string]: string[];
  };
  camera: {
    zoomedIn: boolean;
    paused: boolean;
    bgColor: string;
  };
  textureHD: boolean;
  mood: string;
}

type Action =
  | 'TOGGLE_BAG_OPEN'
  | 'TOGGLE_CAMERA_OPEN'
  | 'OPEN_IMAGE_UPLOAD'
  | 'CLOSE_IMAGE_UPLOAD'
  | 'SET_MOOD'
  | 'SET_ZOOM'
  | 'SET_PAUSED'
  | 'SET_BG_COLOR'
  | 'SET_TEXTURE_HD'
  | 'TOGGLE_ACCESSORY'
  | 'SET_QUEST_MODE';

interface TokenAction {
  tokenId: TokenId;
  type: Action;
}

interface ActionToggleBagOpen extends TokenAction {
  type: 'TOGGLE_BAG_OPEN';
  payload: boolean;
}

interface ActionSetCameraOpen extends TokenAction {
  type: 'TOGGLE_CAMERA_OPEN';
  payload: boolean;
}

interface ActionOpenImageUpload extends TokenAction {
  type: 'OPEN_IMAGE_UPLOAD';
}

interface ActionCloseImageUpload extends TokenAction {
  type: 'CLOSE_IMAGE_UPLOAD';
}

interface ActionSetMood extends TokenAction {
  type: 'SET_MOOD';
  payload: string;
}

interface ActionSetZoom extends TokenAction {
  type: 'SET_ZOOM';
  payload: boolean;
}

interface ActionSetPaused extends TokenAction {
  type: 'SET_PAUSED';
  payload: boolean;
}

interface ActionSetTextureHD extends TokenAction {
  type: 'SET_TEXTURE_HD';
  payload: boolean;
}

interface ActionSetBgColor extends TokenAction {
  type: 'SET_BG_COLOR';
  payload: string;
}

interface ActionToggleAccessory extends TokenAction {
  type: 'TOGGLE_ACCESSORY';
  payload: { id: string; slot: string };
}

interface ActionSetQuestMode extends TokenAction {
  type: 'SET_QUEST_MODE';
  payload: string | undefined;
}

export type TokenStateAction =
  | ActionToggleBagOpen
  | ActionSetCameraOpen
  | ActionOpenImageUpload
  | ActionCloseImageUpload
  | ActionSetMood
  | ActionSetZoom
  | ActionSetPaused
  | ActionSetTextureHD
  | ActionSetBgColor
  | ActionToggleAccessory
  | ActionSetQuestMode;

export type TokenPageState = Record<string, TokenState>;

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
  textureHD: false,
};

export default (
  state: TokenPageState = {},
  action: TokenStateAction
): TokenPageState => {
  const { tokenId } = action;
  if (tokenId === undefined) {
    return state;
  }

  const tokenState = state[tokenId] ?? initialState;
  const nextTokenState: TokenState = {
    ...tokenState,
  };

  switch (action.type) {
    case 'TOGGLE_BAG_OPEN':
      nextTokenState.bagOpen = action.payload;
      nextTokenState.cameraOpen = false;
      break;
    case 'TOGGLE_CAMERA_OPEN':
      nextTokenState.cameraOpen = action.payload;
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
      nextTokenState.mood = action.payload;
      break;
    case 'SET_ZOOM':
      nextTokenState.camera = {
        ...nextTokenState.camera,
        zoomedIn: action.payload,
        paused: action.payload ? true : nextTokenState.camera.paused,
      };
      nextTokenState.mood = action.payload ? 'idle' : nextTokenState.mood;
      break;
    case 'SET_PAUSED':
      nextTokenState.camera = {
        ...nextTokenState.camera,
        paused: action.payload,
      };
      break;
    case 'SET_TEXTURE_HD':
      nextTokenState.textureHD = action.payload;
      break;
    case 'SET_BG_COLOR':
      nextTokenState.camera = {
        ...nextTokenState.camera,
        bgColor: action.payload,
      };
      break;
    case 'TOGGLE_ACCESSORY':
      if (nextTokenState.accessories === undefined) {
        nextTokenState.accessories = {};
      }
      const { id, slot }: { id: string; slot: string } = action.payload;
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
      nextTokenState.bagOpen =
        action.payload === 'toadz' ? false : nextTokenState.bagOpen;
      nextTokenState.cameraOpen = false;
      nextTokenState.questMode =
        nextTokenState.questMode === action.payload
          ? undefined
          : action.payload;
      break;
    default:
      break;
  }

  const finalState: TokenPageState = {
    ...state,
    [tokenId]: nextTokenState,
  };

  return finalState;
};
