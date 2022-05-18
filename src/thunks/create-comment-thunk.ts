import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import { postComment } from '../services/api';
import {
  commentPostRequested,
  commentPostSucceeded,
  commentPostFailed,
  setViewCommentsFeed,
  resetComment,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const createCommentThunk: AppThunk = (slug: string) => async (dispatch, getState) => {
  const newComment = getState().forms.comment.comment ?? '';
  try {
    if (newComment) {
      dispatch(commentPostRequested());
      const { data: { comment } } = await postComment(slug, newComment);
      batch(() => {
        dispatch(setViewCommentsFeed([comment]));
        dispatch(resetComment());
        dispatch(commentPostSucceeded());
      });
    }
  } catch (error) {
    dispatch(commentPostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default createCommentThunk;
