import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const EditProfileSettings: FC<{ isUser: boolean }> = ({ isUser }) => {
  if (isUser) {
    return (
      <Link
        to='/settings'
        className='btn btn-sm btn-outline-secondary action-btn'>
        <i className='ion-gear-a' />
        {' '}
        Edit Profile Settings
      </Link>
    );
  }
  return null;
};

export default EditProfileSettings;
