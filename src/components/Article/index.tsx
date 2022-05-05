import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleMeta from './ArticleMeta';
import CommentContainer from '../Comment/CommentContainer';
import { useSelector, useDispatch } from '../../services/hooks';

import { getArticleThunk, getCommentsThunk } from '../../thunks';
import { resetArticle } from '../../store';

const Article: FC = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { article } = useSelector((state) => state.view);
  const currentUser = useSelector((state) => state.profile.username);

  useEffect(() => {
    dispatch(getArticleThunk(params.id));
    dispatch(getCommentsThunk(params.id));

    return () => {
      dispatch(resetArticle());
    };
  }, [dispatch, params.id]);

  if (!article) {
    return (
      <p>Подождите...</p>
    );
  }

  const canModify = currentUser === article.author.username;

  return (
    <div className='article-page'>

      <div className='banner'>
        <div className='container'>

          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            canModify={canModify} />

        </div>
      </div>

      <div className='container page'>

        <div className='row article-content'>
          <div className='col-xs-12'>

            <p>{article.body}</p>

            <ul className='tag-list'>
              {
                article.tagList.map((tag) => (
                  <li
                    className='tag-default tag-pill tag-outline'
                    key={tag}>
                    {tag}
                  </li>
                ))
              }
            </ul>

          </div>
        </div>

        <hr />

        <div className='article-actions' />

        <div className='row'>
          <CommentContainer />
        </div>
      </div>
    </div>
  );
};

export default Article;
