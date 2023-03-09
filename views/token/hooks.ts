import { Dispatch } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TokenStateAction } from '@/views/token/reducer';
import type { RootState } from '@/views/token/store';

export const useTokenDispatch: () => Dispatch<TokenStateAction> = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
