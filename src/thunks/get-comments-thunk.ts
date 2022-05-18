import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk } from '../store/store.types';
import { fetchComments } from '../services/api';
import {
  setViewCommentsFeed, commentsFetchSucceeded, commentsFetchFailed, commentsFetchRequested,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const getComments: AppThunk = (slug: string) => async (dispatch) => {
  dispatch(commentsFetchRequested());
  try {
    const { data: { comments } } = await fetchComments(slug);
    batch(() => {
      dispatch(setViewCommentsFeed(comments));
      dispatch(commentsFetchSucceeded());
    });
  } catch (error) {
    dispatch(commentsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getComments;
