import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import configurationReducer from './configuration-slice';

const store = configureStore({
  reducer: {
    configuration: configurationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
