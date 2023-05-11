import { Euler, Vector3 } from 'three';
import { EthAddress } from '@/utils/types';

export type SubmitResponse = {
  type: string;
  message: string;
  textureUrl?: string;
};

export type UploadResponse = {
  type: string;
  message: string;
  textureUrl?: string;
};

export type TattooAPIObject = {
  token_id: number;
  tattoo_url: string;
  owner: EthAddress;
  coordinates: {
    size: {
      x: number;
      y: number;
      z: number;
    };
    position: {
      x: number;
      y: number;
      z: number;
    };
    orientation: {
      _x: number;
      _y: number;
      _z: number;
      _order: string;
      isEuler: boolean;
    };
  };
};

export type TattooCoordinates = {
  position: Vector3;
  orientation: Euler;
  size: Vector3;
};
