import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { clearUser, onLogout } from '../../store';
import ListErrors from '../ListErrors';
import SettingsForm from './settings-form';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogout = () => {
    dispatch(clearUser());
    dispatch(onLogout());
    navigate('/');
  };

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <ListErrors />
            <SettingsForm />
            <hr />
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={onClickLogout}>
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
