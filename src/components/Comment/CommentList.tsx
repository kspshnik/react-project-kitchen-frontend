import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import getComments from '../../thunks/get-comments-thunk';
import Comment from './Comment';

const CommentList: FC = () => {
  const { id: slug = '' } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.view.commentsFeed);
  const currentUserProfile = useSelector((store) => store.profile);

  useEffect(() => {
    dispatch(getComments(slug));
  }, [dispatch, comments.length, slug]);

  if (Array.isArray(comments) && !comments.length) {
    return null;
  }
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
          currentUserProfile={currentUserProfile}
          slug={slug}
          key={comment.id} />
      ))}
    </div>
  );
};

export default CommentList;
