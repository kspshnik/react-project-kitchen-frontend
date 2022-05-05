import React from 'react';
import { batch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { clearTag, setFeedType, setPage } from '../../store';
import { FeedTypes } from '../../types/types';

const GlobalFeedTab = () => {
  const dispatch = useDispatch();
  const { feedType } = useSelector((state) => state.view);
  const onClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    batch(() => {
      dispatch(clearTag());
      dispatch(setPage(1));
      dispatch(setFeedType(FeedTypes.public));
    });
  };
  return (
    <li className='nav-item'>
      <button
        type='button'
        className={feedType === FeedTypes.public ? 'nav-link active' : 'nav-link'}
        onClick={onClick}>
        Global Feed
      </button>
    </li>
  );
};

export default GlobalFeedTab;
