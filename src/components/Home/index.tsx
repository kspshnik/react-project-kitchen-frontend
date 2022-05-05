import React, { useEffect, FC } from 'react';
import { useDispatch } from '../../services/hooks';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';

import { clearView } from '../../store';
import getAllTagsThunk from '../../thunks/get-all-tags-thunk';

const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTagsThunk());
    return () => {
      dispatch(clearView());
    };
  }, [dispatch]);

  return (
    <div className='home-page'>
      <Banner />
      <div className='container page'>
        <div className='row'>
          <MainView />
          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
              <Tags />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default Home;
