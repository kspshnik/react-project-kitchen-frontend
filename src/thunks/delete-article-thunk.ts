import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { AppThunk, AppDispatch, RootState } from '../store/store.types';
import {
  articleDeleteRequested, articleDeleteSucceeded, articleDeleteFailed, setAllArticles,
} from '../store';
import { deleteArticle } from '../services/api';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const deleteArticleThunk: AppThunk = (slug: string) => async (
  dispatch : AppDispatch,
  getState : () => RootState,
) => {
  dispatch(articleDeleteRequested());
  try {
    const { status } = await deleteArticle(slug);
    if (status === 204) {
      const articles = getState().all.articles ?? [];
      batch(() => {
        dispatch(setAllArticles(articles?.filter((item) => item.slug !== slug)));
        dispatch(articleDeleteSucceeded());
        // TODO: Надо перезапросить текущие статьи, или на странице будет меньше статей чем надо
      });
    } else dispatch(articleDeleteFailed({ errors: { 'Unexpected error': `Server replied with code ${status}` } }));
  } catch (error) {
    dispatch(articleDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default deleteArticleThunk;
