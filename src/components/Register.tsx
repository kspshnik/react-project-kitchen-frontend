import { Link } from 'react-router-dom';
import React, {
  ChangeEvent, FC, SyntheticEvent, useEffect,
} from 'react';
import ListErrors from './ListErrors';
import { useSelector, useDispatch } from '../services/hooks';
import {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  resetFormRegister,
} from '../store';
import { registerThunk } from '../thunks';

const Register: FC = () => {
  const { username, email, password } = useSelector((state) => state.forms.register);
  const { isUserRegistering } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmailRegister(e.target.value));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePasswordRegister(e.target.value));
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUsernameRegister(e.target.value));
  };

  const submitForm = () => (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerThunk());
  };

  useEffect(() => () => {
    dispatch(resetFormRegister());
  }, [dispatch]);

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>

          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign Up</h1>
            <p className='text-xs-center'>
              <Link to='/login'>
                Have an account?
              </Link>
            </p>

            <ListErrors />

            <form onSubmit={submitForm()}>
              <fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Username'
                    value={username || ''}
                    onChange={onChangeUsername} />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='email'
                    placeholder='Email'
                    value={email || ''}
                    onChange={onChangeEmail} />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Password'
                    value={password || ''}
                    onChange={onChangePassword} />
                </fieldset>

                <button
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'
                  disabled={isUserRegistering}>
                  Sign up
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
