import { AppThunk } from '../store/store.types';

import { setTopFeed } from '../store';

import { compareLikesForTop, makeTopFeed } from '../services/helpers';

const setTopLikedThunk: AppThunk = (qty: number) => (dispatch, getState) => {
  const articles = getState().all.articles ?? [];
  dispatch(setTopFeed(makeTopFeed(articles, compareLikesForTop, qty ?? 5)));
};

export default setTopLikedThunk;
