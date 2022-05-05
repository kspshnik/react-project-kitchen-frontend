import React, {
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent,
  FC,
} from 'react';
import { useParams } from 'react-router-dom';
// import ListErrors from './ListErrors';
import { useSelector, useDispatch } from '../services/hooks';
import {
  setTitle, setDescription, setBody, setTags, resetArticle, setTaglist, deleteTag, setImage,
} from '../store';
import { postArticle, patchArticle } from '../services/api';
import getArticleThunk from '../thunks/get-article-thunk';

const Editor: FC = () => {
  const dispatch = useDispatch();
  const {
    title, description, body, tags, tagList, link,
  } = useSelector((state) => state.forms.article) ?? {};
  const { isArticleFetching } = useSelector((state) => state.api);
  const { slug } = useParams();

  const initialArticle = useSelector((state) => state.view.article);

  useEffect(() => {
    initialArticle?.tagList.forEach((el) => {
      dispatch(setTaglist(el));
    });
  }, [initialArticle, dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(getArticleThunk(slug));
    }

    return () => {
      dispatch(resetArticle());
    };
  }, [dispatch, slug]);

  if (slug && isArticleFetching) {
    return <div>Подождите...</div>;
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
  };

  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setBody(e.target.value));
  };

  const onChangeTags = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTags(e.target.value));
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setImage(e.target.value));
  };

  const watchForEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && tags) {
      dispatch((setTaglist(tags)));
      dispatch(setTags(''));
    }
  };

  const removeTagHandler = (tag: string) => () => {
    dispatch(deleteTag(tag));
  };

  const submitForm = (e: SyntheticEvent<Element>) => {
    e.preventDefault();

    if (slug) {
      dispatch(patchArticle(
        slug,
        {
          title,
          description,
          body,
          tagList,
          link,
        },
      ));
    } else {
      dispatch(postArticle(
        {
          title,
          description,
          body,
          tagList,
          link,
        },
      ));
    }
  };

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {/* <ListErrors errors={props.errors} /> */}

            <form>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Article Title'
                    value={title === '' ? '' : title || initialArticle?.title}
                    onChange={onChangeTitle} />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder="What's this article about?"
                    value={description === '' ? '' : description || initialArticle?.description}
                    onChange={onChangeDescription} />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='url'
                    placeholder='Article Image'
                    value={link === '' ? '' : link || initialArticle?.link}
                    onChange={onChangeImage} />
                </fieldset>

                <fieldset className='form-group'>
                  <textarea
                    className='form-control'
                    rows={8}
                    placeholder='Write your article (in markdown)'
                    value={body === '' ? '' : body || initialArticle?.body}
                    onChange={onChangeBody} />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Enter tags'
                    value={tags || ''}
                    onChange={onChangeTags}
                    onKeyUp={watchForEnter} />

                  <div className='tag-list'>
                    {(tagList || []).map((tag: string) => (
                      <span className='tag-default tag-pill' key={tag}>
                        <button
                          className='ion-close-round'
                          onClick={removeTagHandler(tag)}
                          type='button'>
                          {tag}
                        </button>
                      </span>
                    ))}
                  </div>
                </fieldset>

                <button
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='button'
                  disabled={false}
                  onClick={submitForm}>
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
