import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppThunk } from '../store/store.types';
import {
  commentDeleteRequested,
  commentDeleteSucceeded,
  commentDeleteFailed,
  setViewCommentsFeed,
} from '../store';
import { deleteComment } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const deleteCommentThunk: AppThunk = (
  slug: string,
  commentId: string,
) => async (dispatch, getState) => {
  dispatch(commentDeleteRequested());
  const { view: { commentsFeed } } = getState();
  try {
    const { status } = await deleteComment(slug, commentId);
    if (status === 204) {
      batch(() => {
        dispatch(commentDeleteSucceeded());
        dispatch(setViewCommentsFeed(
          commentsFeed?.filter((comment) => comment.id !== commentId) ?? [],
        ));
      });
    } else {
      dispatch(commentDeleteFailed({ errors: { 'Unexpected error': `Server replied with code ${status}` }, statusCode: status }));
    }
  } catch (error) {
    dispatch(commentDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteCommentThunk;
