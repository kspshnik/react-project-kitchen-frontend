import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchPublicFeed } from '../services/api';
import {
  publicFeedFailed,
  publicFeedRequested,
  publicFeedSucceeded,
  setFeedCount,
  setViewFeed,
} from '../store';
import { AppDispatch, AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError, TAPIParamsObject } from '../services/api.types';

const getPublicFeedThunk: AppThunk = (
  params: TAPIParamsObject,
) => async (dispatch : AppDispatch) => {
  try {
    batch(() => {
      dispatch(publicFeedRequested());
    });
    const
      { data: { articles, articlesCount } } = await fetchPublicFeed(params);
    batch(() => {
      dispatch(setViewFeed(articles));
      dispatch(setFeedCount(articlesCount));
      dispatch(publicFeedSucceeded());
    });
  } catch (error) {
    dispatch(publicFeedFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getPublicFeedThunk;
