import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TArticles, TTags } from '../types/types';

type TAllState = {
  articles: TArticles | null;
  tags: TTags | null;
};
const initialState : TAllState = {
  articles: null,
  tags: null,
};

const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    setAllArticles: (state : TAllState, action: PayloadAction<TArticles>) => ({
      ...state, articles: action.payload,
    }),
    setAllTags: (state : TAllState, action: PayloadAction<TTags>) => ({
      ...state, tags: action.payload,
    }),
    clearArticles: (state: TAllState) => ({ ...state, articles: null }),
    clearTags: (state: TAllState) => ({ ...state, tags: null }),
    clearAll: (state: TAllState) => ({ ...state, ...initialState }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setAllArticles,
  setAllTags,
  clearArticles,
  clearTags,
  clearAll,
} = allSlice.actions;
export default allReducer;
