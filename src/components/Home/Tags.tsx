import React, { FC } from 'react';

import { batch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/hooks';
import { setFeedType, setTag } from '../../store';
import { FeedTypes } from '../../types/types';

const Tags: FC = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.all);
  if (tags) {
    return (
      <div className='tag-list'>
        {
          tags.map((tag) => {
            const handleClick = (ev:React.MouseEvent) => {
              ev.preventDefault();
              batch(() => {
                dispatch(setTag(tag));
                dispatch(setFeedType(FeedTypes.tags));
              });
            };

            return (
              <button
                type='button'
                className='tag-default tag-pill'
                key={tag}
                onClick={handleClick}>
                {tag}
              </button>
            );
          })
        }
      </div>
    );
  }
  return (
    <div>Loading Tags...</div>
  );
};
export default Tags;
