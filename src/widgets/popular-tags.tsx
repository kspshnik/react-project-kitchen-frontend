/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from '../services/hooks';
import { setSelectedTags } from '../store';
import Tag from './tag';
import { HeaderThreeText } from '../ui-lib';

const PopularTagsContainer = styled.div`
  margin-bottom: 56px;
  position: relative;
  z-index: 10;

  @media screen and (max-width:768px) {
    margin-bottom: 40px;
  }
`;

const TagList = styled.div`
  max-width: 360px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
`;

const PopularTags: FC = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.all);
  const { selectedTags } = useSelector((state) => state.view);

  const handleClick = (ev:React.MouseEvent, tag: string) => {
    ev.preventDefault();
    if (selectedTags) {
      dispatch(setSelectedTags([...selectedTags, tag]));
    } else {
      dispatch(setSelectedTags([tag]));
    }
  };

  const deactivateTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    dispatch(setSelectedTags(selectedTags!.filter((el) => el !== tag)));
  };

  if (tags) {
    return (
      <PopularTagsContainer>
        <HeaderThreeText paddingCSS='padding-bottom: 16px;'>
          <FormattedMessage id='popularTags' />
        </HeaderThreeText>
        <TagList>
          {
            tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                pointer
                handleClick={handleClick}
                isActive={selectedTags?.includes(tag) || false}
                deactivateTag={(e) => deactivateTag(e, tag)} />
            ))
          }
        </TagList>
      </PopularTagsContainer>

    );
  }
  return (
    <div>Loading Tags...</div>
  );
};
export default PopularTags;
