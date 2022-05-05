import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  FeedTypes, TArticle, TArticles, TComment, TComments, TProfile, TTags, UserArticlesTypes,
} from '../types/types';

type TViewState = {
  feed: TArticles | null;
  feedCount: number;
  article: TArticle | null;
  tagsList: TTags | null;
  selectedTags: TTags | null;
  tag: string | null,
  commentsFeed: TComments;
  comment: TComment | null;
  page: number;
  perPage: number;
  profile: TProfile | null;
  feedType: FeedTypes;
  articlesType:UserArticlesTypes
};

const initialState: TViewState = {
  feed: null,
  feedCount: 0,
  article: null,
  tagsList: null,
  selectedTags: null,
  tag: null,
  commentsFeed: [],
  comment: null,
  page: 1,
  perPage: 10,
  profile: null,
  feedType: FeedTypes.public,
  articlesType: UserArticlesTypes.my,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewFeed: (state: TViewState, action: PayloadAction<TArticles>) => ({
      ...state, feed: action.payload,
    }),
    clearViewFeed: (state: TViewState) => ({
      ...state, feed: null,
    }),
    setFeedCount: (state: TViewState, action : PayloadAction<number>) => ({
      ...state, feedCount: action.payload,
    }),
    setViewTags: (state: TViewState, action: PayloadAction<TTags>) => ({
      ...state, tagsList: action.payload,
    }),
    clearViewTags: (state: TViewState) => ({
      ...state, tagsList: null, selectedTags: null,
    }),
    setViewArticle: (state: TViewState, action: PayloadAction<TArticle>) => ({
      ...state, article: action.payload,
    }),
    clearViewArticle: (state: TViewState) => ({
      ...state, article: null,
    }),
    setSelectedTags: (state: TViewState, action: PayloadAction<TTags>) => ({
      ...state, selectedTags: action.payload,
    }),
    clearSelectedTags: (state: TViewState) => ({
      ...state, selectedTags: null,
    }),
    setTag: (state: TViewState, action: PayloadAction<string>) => ({
      ...state, tag: action.payload,
    }),
    clearTag: (state: TViewState) => ({
      ...state, tag: null,
    }),
    setViewCommentsFeed: (state: TViewState, action: PayloadAction<TComments>) => ({
      ...state, commentsFeed: action.payload,
    }),
    setViewCommentFeed: (state: TViewState, action: PayloadAction<TComment>) => ({
      ...state, commentsFeed: [...state.commentsFeed, action.payload],
    }),
    clearViewCommentsFeed: (state: TViewState) => ({
      ...state, commentsFeed: [],
    }),
    selectViewComment: (state: TViewState, action: PayloadAction<TComment>) => ({
      ...state, comment: action.payload,
    }),
    clearViewComment: (state: TViewState) => ({
      ...state, comment: null,
    }),
    setPage: (state: TViewState, action: PayloadAction<number>) => ({
      ...state, page: action.payload,
    }),
    clearPage: (state: TViewState) => ({
      ...state, page: 1,
    }),
    setPageLimit: (state: TViewState, action: PayloadAction<number>) => ({
      ...state, perPage: action.payload,
    }),
    clearView: (state: TViewState) => ({
      ...state, ...initialState,
    }),
    setViewProfile: (state: TViewState, action: PayloadAction<TProfile>) => ({
      ...state, profile: action.payload,
    }),
    clearViewProfile: (state: TViewState) => ({
      ...state, profile: null,
    }),
    setFeedType: (state: TViewState, action: PayloadAction<FeedTypes>) => ({
      ...state, feedType: action.payload,
    }),
    setArtistProfile: (state: TViewState, action: PayloadAction<UserArticlesTypes>) => ({
      ...state, articlesType: action.payload,
    }),
  },
});

export const {
  clearPage,
  setViewFeed,
  clearViewFeed,
  setFeedCount,
  setViewTags,
  clearViewTags,
  setViewArticle,
  clearViewArticle,
  setSelectedTags,
  clearSelectedTags,
  setViewCommentsFeed,
  setViewCommentFeed,
  clearViewCommentsFeed,
  selectViewComment,
  clearViewComment,
  setPage,
  setPageLimit,
  clearView,
  setViewProfile,
  clearViewProfile,
  setTag,
  clearTag,
  setFeedType,
  setArtistProfile,
} = viewSlice.actions;
const viewReducer = viewSlice.reducer;
export default viewReducer;
