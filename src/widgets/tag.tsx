import React, { FC, MouseEventHandler, MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { CrossIcon } from '../ui-lib';
import { getPropOnCondition } from '../services/helpers';

interface ITagProps extends ITagButtonProps {
  tag: string,
  handleClick?: (e: MouseEvent<HTMLButtonElement>, tag: string) => void,
  deactivateTag?: MouseEventHandler<SVGSVGElement>,
}

interface ITagButtonProps {
  isActive: boolean;
  pointer?: boolean;
}

const Button = styled.button<ITagButtonProps>`

    padding: 0;
    border: none;
    font-family: ${({ theme }) => theme.text18Sans.family};
    font-weight: ${({ theme }) => theme.text18Sans.weight};
    font-size: ${({ theme }) => theme.text18Sans.size}px;
    line-height: ${({ theme }) => theme.text18Sans.height}px;
    cursor: ${({ pointer }) => getPropOnCondition(pointer, 'inherit', 'pointer')};
    display: flex;
    align-items: center;
    color: ${({ isActive, theme }) => (isActive ? theme.button.blue.default : theme.secondaryText)};
    background-color: transparent;

    :active {
      outline: none;
    }
  `;

const Tag: FC<ITagProps> = ({
  tag, handleClick = () => {}, isActive, deactivateTag, pointer,
}) => {
  const theme = useTheme();

  return (
    <Button
      isActive={isActive}
      pointer={pointer}
      type='button'
      key={tag}
      onClick={(e) => handleClick(e, tag)}>
      #
      {tag}
      {' '}
      {isActive && deactivateTag && <CrossIcon color={theme.markedText} onClick={deactivateTag} />}
    </Button>
  );
};

Tag.defaultProps = {
  handleClick: undefined,
  deactivateTag: undefined,
  pointer: false,
};

export default Tag;
