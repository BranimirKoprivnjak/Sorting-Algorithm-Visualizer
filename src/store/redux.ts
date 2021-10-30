import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_ARRAY_SIZE, DEFAULT_ANIMATION_SPEED } from '../config/config';
import { State } from '../models/model';

const initialState: State = {
  algorithm: '',
  array: [],
  arraySize: DEFAULT_ARRAY_SIZE,
  animationSpeed: DEFAULT_ANIMATION_SPEED,
};

const stateSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    algorithm(state: State, action: PayloadAction<string>) {
      state.algorithm = action.payload;
    },
    arrayChange(state: State, action: PayloadAction<number[]>) {
      state.array = action.payload;
    },
    arraySizeChange(state: State, action: PayloadAction<number>) {
      state.arraySize = action.payload;
    },
    animationSpeedChange(state: State, action: PayloadAction<number>) {
      state.animationSpeed = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { state: stateSlice.reducer },
});

export const stateActions = stateSlice.actions;

export default store;
