import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';

const Banner : FC = () => {
  const { appName } = useSelector((state) => state.system);
  const isLoggedIn = useSelector(
    (state) => !!state.profile.username && !!state.profile.email,
  );

  return (
    isLoggedIn
      ? null
      : (
        <div className='banner'>
          <div className='container'>
            <h1 className='logo-font'>
              {appName.toLowerCase()}
            </h1>
            <p>Your community project starter pack.</p>
          </div>
        </div>
      )
  );
};

export default Banner;
