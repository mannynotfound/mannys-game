import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import reducer from '@/views/token/reducer';

const rootReducer = combineReducers({
  tokens: reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
