import React, { FC, useCallback } from 'react';
import { TProfile } from '../../types/types';

const FollowUserButton: FC<{
  isUser: boolean,
  user: TProfile,
  follow: () => void,
  unfollow: () => void
}> = ({
  isUser, user, follow, unfollow,
}) => {
  const handleClick = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    if (user.following) {
      unfollow();
    } else {
      follow();
    }
  }, [follow, unfollow, user.following]);
  if (isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (user?.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  return (
    <button
      type='button'
      className={classes}
      onClick={handleClick}>
      <i className='ion-plus-round' />
      &nbsp;
      { user?.following ? 'Unfollow' : 'Follow'}
      {' '}
      { user?.username }
    </button>
  );
};

export default FollowUserButton;
