import { Dispatch } from 'react';

type CameraState = {
  zoomedIn: boolean;
  paused: boolean;
  bgColor: string;
};

export type TokenState = {
  bagOpen: boolean;
  cameraOpen: boolean;
  imageUploadOpen: boolean;
  questMode?: string;
  accessories?: {
    [slot: string]: string[];
  };
  camera: CameraState;
  useTextureHD: boolean;
  mood: string;
};

export type TokenPageState = {
  [tokenId: string]: TokenState;
};

export type TokenStateAction = {
  type: string;
  tokenId: number;
  payload?: any;
};

export type TokenStateDispatch = Dispatch<TokenStateAction>;

export type BagTooltip = {
  distanceFromEdge: number;
  bgColor: string;
  label: string;
  description: string;
  level?: number;
  stats?: Record<string, number>;
  slot?: string;
  requirement?: string;
};

export type SetTooltipArgs =
  | {
      bgColor: string;
      distanceFromEdge: number;
      label: string;
      description: string;
    }
  | undefined;
