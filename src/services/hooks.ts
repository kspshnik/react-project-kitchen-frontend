import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { AppDispatch, RootState, AppThunk } from './types'
  export const useDispatch = () => dispatchHook<AppDispatch>();
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
