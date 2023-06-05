import { createAction, createSlice } from '@reduxjs/toolkit';
import type { TokenId, TokenUserMetadata } from '@/utils/types';

export interface TokenState {
  zoomedIn: boolean;
  paused: boolean;
  bgColor: string;
  accessories?: { [slot: string]: string[] };
  textureHD: boolean;
  mood: string;
}

export interface TokenPageState {
  bagOpen: boolean;
  cameraOpen: boolean;
  imageUploadOpen: boolean;
  camera: {
    position: { x: number; y: number; z: number };
  };
  tokens: { [tokenId: string]: TokenState };
}

export const initialTokenState: TokenState = {
  zoomedIn: false,
  paused: false,
  bgColor: '#0e0e0e',
  textureHD: false,
  accessories: undefined,
  mood: 'idle',
};

const initialState: TokenPageState = {
  bagOpen: false,
  cameraOpen: false,
  imageUploadOpen: false,
  camera: {
    position: { x: 0, y: 0, z: 0 },
  },
  tokens: {},
};

export const hydrateUserState = createAction<{
  tokenId: TokenId;
  value: Partial<TokenUserMetadata>;
}>('HYDRATE_USER_STATE');
export const toggleBagOpen = createAction<{ tokenId: TokenId; value: boolean }>(
  'TOGGLE_BAG_OPEN'
);
export const toggleCameraOpen = createAction<{
  tokenId: TokenId;
  value: boolean;
}>('TOGGLE_CAMERA_OPEN');
export const openImageUpload = createAction<{ tokenId: TokenId }>(
  'OPEN_IMAGE_UPLOAD'
);
export const closeImageUpload = createAction<{ tokenId: TokenId }>(
  'CLOSE_IMAGE_UPLOAD'
);
export const setMood = createAction<{ tokenId: TokenId; value: string }>(
  'SET_MOOD'
);
export const setZoom = createAction<{ tokenId: TokenId; value: boolean }>(
  'SET_ZOOM'
);
export const setPaused = createAction<{ tokenId: TokenId; value: boolean }>(
  'SET_PAUSED'
);
export const setTextureHD = createAction<{ tokenId: TokenId; value: boolean }>(
  'SET_TEXTURE_HD'
);
export const setBgColor = createAction<{ tokenId: TokenId; value: string }>(
  'SET_BG_COLOR'
);
export const toggleAccessory = createAction<{
  tokenId: TokenId;
  value: { id: string; slot: string };
}>('TOGGLE_ACCESSORY');
export const setQuestMode = createAction<{
  tokenId: TokenId;
  value: string | undefined;
}>('SET_QUEST_MODE');
export const updateSceneCamera = createAction<{
  value: Partial<TokenPageState['camera']>;
}>('UPDATE_SCENE_CAMERA');

const initializeToken = (state: TokenPageState, tokenId: TokenId) => {
  if (!state.tokens[tokenId]) state.tokens[tokenId] = initialTokenState;
};

const tokensSlice = createSlice({
  name: 'token-page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUserState, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        state.tokens[tokenId] = {
          ...state.tokens[tokenId],
          accessories: value.accessories ?? state.tokens[tokenId].accessories,
          mood: value?.animation?.id ?? state.tokens[tokenId].mood,
          zoomedIn: value?.camera?.pfp_mode ?? state.tokens[tokenId].zoomedIn,
          paused: value?.animation?.paused ?? state.tokens[tokenId].paused,
          bgColor:
            value?.scene?.background_color ?? state.tokens[tokenId].bgColor,
          textureHD:
            value?.scene?.texture_hd ?? state.tokens[tokenId].textureHD,
        };
      })
      .addCase(toggleBagOpen, (state, action) => {
        const { value } = action.payload;
        state.bagOpen = value;
        state.cameraOpen = false;
      })
      .addCase(toggleCameraOpen, (state, action) => {
        const { value } = action.payload;
        state.cameraOpen = value;
        state.bagOpen = false;
      })
      .addCase(openImageUpload, (state) => {
        state.imageUploadOpen = true;
        state.cameraOpen = false;
        state.bagOpen = false;
      })
      .addCase(closeImageUpload, (state) => {
        state.imageUploadOpen = false;
      })
      .addCase(setMood, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        state.tokens[tokenId].mood = value;
      })
      .addCase(setZoom, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        state.tokens[tokenId].zoomedIn = value;
        state.tokens[tokenId].paused = value
          ? true
          : state.tokens[tokenId].paused;
        state.tokens[tokenId].mood = value
          ? 'idle'
          : state.tokens[tokenId].mood;
      })
      .addCase(setPaused, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        state.tokens[tokenId].paused = value;
      })
      .addCase(setTextureHD, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        state.tokens[tokenId].textureHD = value;
      })
      .addCase(setBgColor, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        state.tokens[tokenId].bgColor = value;
      })
      .addCase(toggleAccessory, (state, action) => {
        const { tokenId, value } = action.payload;
        initializeToken(state, tokenId);
        if (state.tokens[tokenId].accessories === undefined) {
          state.tokens[tokenId].accessories = {};
        }
        const { id, slot }: { id: string; slot: string } = value;
        let newAccessories = state.tokens[tokenId].accessories?.[slot] ?? [];
        if (newAccessories.includes(id)) {
          newAccessories = newAccessories.filter((acc) => acc !== id);
        } else {
          newAccessories = [id];
        }
        state.tokens[tokenId].accessories = {
          ...state.tokens[tokenId].accessories,
          [slot]: newAccessories,
        };
      })
      .addCase(updateSceneCamera, (state, action) => {
        const { value } = action.payload;
        state.camera = {
          position: value.position ?? state.camera.position,
        };
      });
  },
});

export default tokensSlice.reducer;
