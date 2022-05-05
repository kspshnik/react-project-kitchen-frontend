import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer: FC = () => {
  const { isLoggedIn } = useSelector((state) => state.system);

  if (isLoggedIn) {
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <div>
          {/* <list-errors errors={props.errors} /> */}
          <CommentInput />
        </div>
        <CommentList />
      </div>
    );
  }
  return (
    <div className='col-xs-12 col-md-8 offset-md-2'>
      <p>
        <Link to='/login'>Sign in</Link>
        &nbsp;or&nbsp;
        <Link to='/register'>sign up</Link>
        &nbsp;to add comments on this article.
      </p>
      <CommentList />
    </div>
  );
};

export default CommentContainer;
