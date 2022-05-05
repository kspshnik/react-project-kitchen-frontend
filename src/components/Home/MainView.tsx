import React from 'react';
import ArticleList from '../ArticleList';
import { useDispatch, useSelector } from '../../services/hooks';
import { getPrivateFeedThunk, getPublicFeedThunk } from '../../thunks';
import TagFilterTab from './TagFilterTab';
import YourFeedTab from './YourFeedTab';
import GlobalFeedTab from './GlobalFeedTab';
import { FeedTypes } from '../../types/types';
import { calculateOffset } from '../../services/helpers';

const MainView = () => {
  const dispatch = useDispatch();
  const {
    page, perPage, feedType, tag,
  } = useSelector((state) => state.view);

  React.useEffect(() => {
    switch (feedType) {
      case FeedTypes.public: {
        dispatch(getPublicFeedThunk({
          offset: calculateOffset(page, perPage),
          limit: perPage,
        }));
        break;
      }
      case FeedTypes.private: {
        dispatch(getPrivateFeedThunk({
          offset: calculateOffset(page, perPage),
          limit: perPage,
        }));
        break;
      }
      case FeedTypes.tags: {
        dispatch(getPublicFeedThunk({
          offset: calculateOffset(page, perPage),
          limit: perPage,
          tag,
        }));
        break;
      }
      default: throw new TypeError('Несоответствующий feedType!');
    }
  }, [dispatch, feedType, page, perPage, tag]);

  return (
    <div className='col-md-9'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active'>
          <YourFeedTab />
          <GlobalFeedTab />
          <TagFilterTab />
        </ul>
      </div>
      <ArticleList />
    </div>
  );
};
export default MainView;
