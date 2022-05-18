import React, { FC, MouseEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import { RegularText } from '../ui-lib';
import ScrollRibbon from './scroll-ribbon';
import ArticleFullPreview from './article-full-preview';
import { addLikeThunk, deleteLikeThunk } from '../thunks';

const RibbonWrapper = styled.ul`
width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  gap: 32px;
`;

const ItemWrapper = styled.li`
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
`;

const FeedRibbon : FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.view.feed);
  const tags = useSelector((state) => state.view.selectedTags) ?? [];
  const { isPublicFeedFetching } = useSelector((state) => state.api);
  if (!posts || isPublicFeedFetching) {
    return (
      <RegularText size='large' weight={500}>
        <FormattedMessage id='loading' />
      </RegularText>
    );
  }
  return (
    <ScrollRibbon>
      <RibbonWrapper>
        {posts.filter((post) => post.tagList.some((tag) => (tags.includes(tag)
            || !tags
            || tags.length < 1))).map((post) => {
          const onClick : MouseEventHandler = () => {
            if (post.favorited) {
              dispatch(deleteLikeThunk(post.slug));
            } else {
              dispatch(addLikeThunk(post.slug));
            }
          };
          return (
            <ItemWrapper key={post.slug}>
              <ArticleFullPreview
                article={post}
                onLikeClick={onClick} />
            </ItemWrapper>
          );
        })}
      </RibbonWrapper>
    </ScrollRibbon>
  );
};

export default FeedRibbon;
