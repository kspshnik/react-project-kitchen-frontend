import { Link, useNavigate } from 'react-router-dom';
import React, {
  useEffect,
  ChangeEvent,
  SyntheticEvent,
  FC,
} from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { changeEmailLogin, changePasswordLogin } from '../store';
import { loginUserThunk } from '../thunks';

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.system);
  const { email, password } = useSelector((state) => state.forms.login);
  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmailLogin(e.target.value));
  };
  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePasswordLogin(e.target.value));
  };
  const submitForm = (e: SyntheticEvent<Element>) => {
    e.preventDefault();
    dispatch(loginUserThunk());

    //  props.onSubmit(email, password);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign In</h1>
            <p className='text-xs-center'>
              <Link to='/register'>
                Need an account?
              </Link>
            </p>
            <form onSubmit={submitForm}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='email'
                    placeholder='Email'
                    value={email ?? ''}
                    onChange={changeEmail} />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Password'
                    value={password ?? ''}
                    onChange={changePassword} />
                </fieldset>
                <button
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'>
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};
export default Login;
