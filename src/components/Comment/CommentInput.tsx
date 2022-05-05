import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { setComment } from '../../store';
import createCommentThunk from '../../thunks/create-comment-thunk';

const CommentInput = () => {
  const { id: slug } = useParams();
  const image = useSelector((state) => state.profile.image) ?? '';
  const username = useSelector((state) => state.profile.username) ?? '';
  const { comment } = useSelector((state) => state.forms.comment);
  const dispatch = useDispatch();

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setComment(e.target.value));
  };

  const handlerForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createCommentThunk(slug));
  };

  return (
    <form className='card comment-form' onSubmit={handlerForm}>
      <div className='card-block'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          value={comment ?? ''}
          onChange={onChangeComment}
          rows={3} />
      </div>
      <div className='card-footer'>
        <img
          src={image}
          className='comment-author-img'
          alt={username} />
        <button
          className='btn btn-sm btn-primary'
          type='submit'>
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
