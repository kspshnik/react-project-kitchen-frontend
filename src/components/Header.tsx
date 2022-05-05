import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../services/hooks';

const Header : FC = () => {
  const { username } = useSelector((state) => state.profile);
  const { isLoggedIn } = useSelector((state) => state.system);
  const { appName } = useSelector((state) => state.system);

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>

        <Link to='/' className='navbar-brand'>
          {appName.toLowerCase()}
        </Link>

        {isLoggedIn && username
          ? (
            <ul className='nav navbar-nav pull-xs-right'>

              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  Home
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/editor' className='nav-link'>
                  <i className='ion-compose' />
                    &nbsp;New Post
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/settings' className='nav-link'>
                  <i className='ion-gear-a' />
                    &nbsp;Settings
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  to={`/${username}`}
                  className='nav-link'>
                  <span>
                    Hello,
                    {username}
                  </span>
                </Link>
              </li>

            </ul>
          )
          : (
            <ul className='nav navbar-nav pull-xs-right'>

              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  Home
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  Sign in
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/register' className='nav-link'>
                  Sign up
                </Link>
              </li>

            </ul>
          )}
      </div>
    </nav>
  );
};

export default Header;
