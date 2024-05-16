import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ENDPOINT, REGION } from '@/constant';

export interface Configuration {
  region: keyof typeof REGION;
  environment: keyof typeof ENDPOINT;
  touchpoint_id: string;
}

interface State {
  isConfigured: boolean;
  data: Configuration;
}

const initialState: State = {
  isConfigured: false,
  data: {
    // @ts-ignore
    region: '',
    // @ts-ignore
    environment: '',
    touchpoint_id: '',
  },
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setConfiguration(state, action: PayloadAction<State['data']>) {
      state.data = action.payload;
    },
    setIsConfigured(state, action: PayloadAction<boolean>) {
      state.isConfigured = action.payload;
    },
  },
});

export const { setConfiguration, setIsConfigured } = configurationSlice.actions;

export default configurationSlice.reducer;
