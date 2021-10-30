import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../models/model';

// https://redux.js.org/usage/usage-with-typescript
export const useCustomDispatch = () => useDispatch<Dispatch>();
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
