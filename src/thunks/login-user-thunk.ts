import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { loginUser, jwt } from '../services/api';
import {
  userLoginRequested,
  userLoginSucceeded,
  userLoginFailed, setUser, onLogin, resetFormLogin,
} from '../store';
import { AppThunk } from '../store/store.types';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';
import { TUser } from '../types/types';

const loginUserThunk : AppThunk = () => async (dispatch, getState) => {
  const loginData = getState().forms.login ?? {};
  try {
    dispatch(userLoginRequested());
    const {
      data: {
        user: {
          username, email, token, bio = '', image = '', nickname = '',
        },
      },
    } = await loginUser(loginData?.email ?? '', loginData?.password ?? '');
    jwt.set(token);
    batch(() => {
      dispatch(userLoginSucceeded());
      dispatch(setUser({
        username, email, bio, image, nickname,
      } as TUser));
      dispatch(onLogin());
      dispatch(resetFormLogin());
    });
  } catch (error) {
    dispatch(userLoginFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default loginUserThunk;
