import { AxiosError } from 'axios';
import { AppDispatch, AppThunk, RootState } from '../store/store.types';
import { postLikeArticle } from '../services/api';
import {
  setViewFeed,
  likeArticlePostRequested,
  likeArticlePostSucceeded,
  likeArticlePostFailed,
} from '../store';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const addLikeThunk: AppThunk = (slug: string) => async (
  dispatch : AppDispatch,
  getState: () => RootState,
) => {
  try {
    dispatch(likeArticlePostRequested());
    const { data: { article } } = await postLikeArticle(slug);
    const articles = getState().view.feed ?? [];
    dispatch(setViewFeed(articles.map(
      (item) => (item.slug === article.slug ? article : item
      ),
    )));
    dispatch(likeArticlePostSucceeded());
  } catch (error) {
    dispatch(likeArticlePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default addLikeThunk;
