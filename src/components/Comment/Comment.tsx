import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { TComment } from '../../types/types';
import DeleteButton from '../Article/DeleteButton';

type CommentProps = {
  comment: TComment;
  slug: string;
  currentUserProfile: {
    username: string | null,
    email: string | null,
    bio?: string | null,
    image?: string | null,
  } | null;
};

const Comment: FC<CommentProps> = ({
  comment, slug, currentUserProfile,
}: CommentProps) => {
  const show = currentUserProfile
    && currentUserProfile.username === comment.author.username;
  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{comment.body}</p>
      </div>
      <div className='card-footer'>
        <Link
          to={`/@${comment.author.username}`}
          className='comment-author'>
          <img src={comment.author.image} className='comment-author-img' alt={comment.author.username} />
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.author.username}`}
          className='comment-author'>
          {comment.author.username}
        </Link>
        <span className='date-posted'>
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={!!show} slug={slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
