import store from '../store/redux';

// application state type
export interface State {
  algorithm: string;
  array: number[];
  arraySize: number;
  animationSpeed: number;
}

// animation data structure type
export interface Animation {
  type: string;
  value: number[][];
}

// custom redux hooks types, https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
