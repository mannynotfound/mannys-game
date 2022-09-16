export default (state, action) => {
  switch (action.type) {
    case 'SET_BAG_OPEN':
      return {
        ...state,
        bagOpen: action.payload,
        cameraOpen: action.payload ? false : state.cameraOpen,
      };
    case 'SET_CAMERA_OPEN':
      return {
        ...state,
        cameraOpen: action.payload,
        bagOpen: action.payload ? false : state.bagOpen,
      };
    case 'OPEN_IMAGE_UPLOAD': {
      return {
        ...state,
        cameraOpen: false,
        imageUploadOpen: true,
      };
    }
    case 'CLOSE_IMAGE_UPLOAD': {
      return {
        ...state,
        imageUploadOpen: false,
      };
    }
    case 'SET_MOOD': {
      const { tokenId, mood } = action.payload;
      return {
        ...state,
        camera: {
          ...state?.camera,
          [tokenId]: {
            ...state?.camera?.[tokenId],
            mood,
          },
        },
      };
    }
    case 'SET_ZOOM': {
      const { tokenId, zoomedIn } = action.payload;
      const useTextureHD = state.useTextureHD;
      if (zoomedIn && !useTextureHD[tokenId]) {
        useTextureHD[tokenId] = true;
      }
      return {
        ...state,
        useTextureHD,
        camera: {
          ...state?.camera,
          [tokenId]: {
            ...state?.camera?.[tokenId],
            mood: zoomedIn ? null : state.camera?.[tokenId]?.mood,
            paused: zoomedIn ? true : state.camera?.[tokenId]?.paused,
            zoomedIn,
          },
        },
      };
    }
    case 'SET_PAUSED': {
      const { tokenId, paused } = action.payload;
      return {
        ...state,
        camera: {
          ...state?.camera,
          [tokenId]: {
            ...state?.camera?.[tokenId],
            paused,
          },
        },
      };
    }
    case 'SET_BG_COLOR': {
      const { tokenId, bgColor } = action.payload;
      return {
        ...state,
        camera: {
          ...state?.camera,
          [tokenId]: {
            ...state?.camera?.[tokenId],
            bgColor,
          },
        },
      };
    }
    case 'TOGGLE_ACCESSORY': {
      const { tokenId, id, slot } = action.payload;
      let newAccessories = state?.accessories?.[tokenId]?.[slot] ?? [];
      if (newAccessories.includes(id)) {
        newAccessories = newAccessories.filter((acc) => acc !== id);
      } else {
        newAccessories = [id];
      }

      return {
        ...state,
        accessories: {
          ...state.accessories,
          [tokenId]: {
            ...state.accessories?.[tokenId],
            [slot]: newAccessories,
          },
        },
      };
    }
    case 'SET_QUEST_MODE': {
      const { quest } = action.payload;

      return {
        ...state,
        bagOpen: quest.id === 'toadz' ? false : state.bagOpen,
        cameraOpen: false,
        questMode: state.questMode === quest.id ? null : quest.id,
      };
    }
    default:
      throw new Error();
  }
};
