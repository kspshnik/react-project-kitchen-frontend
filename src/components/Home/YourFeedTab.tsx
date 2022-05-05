import React from 'react';
import { batch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { clearTag, setFeedType, setPage } from '../../store';
import { FeedTypes } from '../../types/types';

const YourFeedTab = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => !!state.profile.username && !!state.profile.email,
  );
  const { feedType } = useSelector((state) => state.view);
  const onClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    batch(() => {
      dispatch(clearTag());
      dispatch(setPage(1));
      dispatch(setFeedType(FeedTypes.private));
    });
  };

  if (isLoggedIn) {
    return (
      <li className='nav-item'>
        <button
          type='button'
          className={feedType === FeedTypes.private ? 'nav-link active' : 'nav-link'}
          onClick={onClick}>
          Your Feed
        </button>
      </li>
    );
  } return null;
};

export default YourFeedTab;
