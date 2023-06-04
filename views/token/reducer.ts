import { createAction, createSlice } from '@reduxjs/toolkit';
import type { TokenId, TokenUserMetadata } from '@/utils/types';

export interface TokenState {
  bagOpen: boolean;
  cameraOpen: boolean;
  imageUploadOpen: boolean;
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

export interface TokenPageState {
  [tokenId: string]: TokenState;
}

export const initialState: TokenState = {
  bagOpen: false,
  cameraOpen: false,
  imageUploadOpen: false,
  accessories: undefined,
  mood: 'idle',
  camera: {
    zoomedIn: false,
    paused: false,
    bgColor: '#0e0e0e',
  },
  textureHD: false,
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

const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {} as TokenPageState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUserState, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId] = {
          ...state[tokenId],
          accessories: value.accessories ?? state[tokenId].accessories,
          mood: value?.animation?.id ?? state[tokenId].mood,
          camera: {
            zoomedIn: value?.camera?.pfp_mode ?? state[tokenId].camera.zoomedIn,
            paused: value?.animation?.paused ?? state[tokenId].camera.paused,
            bgColor:
              value?.scene?.background_color ?? state[tokenId].camera.bgColor,
          },
          textureHD: value?.scene?.texture_hd ?? state[tokenId].textureHD,
        };
      })
      .addCase(toggleBagOpen, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].bagOpen = value;
        state[tokenId].cameraOpen = false;
      })
      .addCase(toggleCameraOpen, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].cameraOpen = value;
        state[tokenId].bagOpen = false;
      })
      .addCase(openImageUpload, (state, action) => {
        const { tokenId } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].imageUploadOpen = true;
        state[tokenId].cameraOpen = false;
        state[tokenId].bagOpen = false;
      })
      .addCase(closeImageUpload, (state, action) => {
        const { tokenId } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].imageUploadOpen = false;
      })
      .addCase(setMood, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].mood = value;
      })
      .addCase(setZoom, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].camera.zoomedIn = value;
        state[tokenId].camera.paused = value
          ? true
          : state[tokenId].camera.paused;
        state[tokenId].mood = value ? 'idle' : state[tokenId].mood;
      })
      .addCase(setPaused, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].camera.paused = value;
      })
      .addCase(setTextureHD, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].textureHD = value;
      })
      .addCase(setBgColor, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        state[tokenId].camera.bgColor = value;
      })
      .addCase(toggleAccessory, (state, action) => {
        const { tokenId, value } = action.payload;
        if (!state[tokenId]) state[tokenId] = initialState;
        if (state[tokenId].accessories === undefined) {
          state[tokenId].accessories = {};
        }
        const { id, slot }: { id: string; slot: string } = value;
        let newAccessories = state[tokenId].accessories?.[slot] ?? [];
        if (newAccessories.includes(id)) {
          newAccessories = newAccessories.filter((acc) => acc !== id);
        } else {
          newAccessories = [id];
        }
        state[tokenId].accessories = {
          ...state[tokenId].accessories,
          [slot]: newAccessories,
        };
      });
  },
});

export default tokensSlice.reducer;
