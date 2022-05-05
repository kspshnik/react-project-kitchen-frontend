import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { TArticle } from '../types/types';

import { deleteArticleThunk } from '../thunks';

const ArticleActions: FC<{ article: TArticle, canModify: boolean }> = ({ article, canModify }) => {
  const dispatch = useDispatch();
  const del = () => {
    dispatch(deleteArticleThunk(article.slug));
  };

  if (canModify) {
    return (

      <span>

        <Link
          to={`/editor/${article.slug}`}
          className='btn btn-outline-secondary btn-sm'>
          <i className='ion-edit' />
          {' '}
          Edit Article
        </Link>

        <button type='button' className='btn btn-outline-danger btn-sm' onClick={del}>
          <i className='ion-trash-a' />
          {' '}
          Delete Article
        </button>

      </span>
    );
  }

  return (
    <span />
  );
};

export default ArticleActions;
