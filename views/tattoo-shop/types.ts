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
  coordinates: string;
};

export type TattooAPIResponse = {
  data: TattooAPIObject[];
};

export type TattooCoordinates = {
  position: Vector3;
  orientation: Euler;
  size: Vector3;
};
