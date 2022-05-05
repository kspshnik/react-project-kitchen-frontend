import React, { FC } from 'react';

import { useSelector, useDispatch } from '../services/hooks';
import { setPage } from '../store';

const ListPagination: FC = () => {
  const dispatch = useDispatch();
  const { feedCount, page, perPage } = useSelector((state) => state.view);

  if (feedCount <= perPage) {
    return null;
  }

  const range : Array<number> = [];
  for (let i = 1; i <= Math.ceil(feedCount / perPage); i += 1) {
    range.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>

        {
          range.map((v) => {
            const isCurrent = v === page;
            const onClick = (ev: React.MouseEvent) => {
              ev.preventDefault();
              dispatch(setPage(v));
            };
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                key={v.toString()}>

                <button
                  className='page-link'
                  onClick={onClick}
                  type='button'>
                  {v}
                </button>

              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};
export default ListPagination;
