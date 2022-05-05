import React, { FC } from 'react';
import { useDispatch } from '../../services/hooks';

import { deleteCommentThunk } from '../../thunks';

const DeleteButton: FC<{
  slug: string,
  commentId: string,
  show: boolean
}> = ({
  slug,
  commentId,
  show,
}) => {
  const dispatch = useDispatch();

  const del = () => {
    dispatch(deleteCommentThunk(slug, commentId));
  };

  if (show) {
    return (
      <span className='mod-options'>
        <button type='button' className='ion-trash-a' onClick={del} />
      </span>
    );
  }
  return null;
};

export default DeleteButton;
