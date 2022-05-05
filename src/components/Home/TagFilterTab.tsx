import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';

const TagFilterTab : FC = () => {
  const { tag } = useSelector((state) => state.view);
  if (!tag) {
    return null;
  }

  return (

    <li className='nav-item'>
      <div className='nav-link active'>
        <i className='ion-pound' />
        {tag}
      </div>
    </li>

  );
};
export default TagFilterTab;
