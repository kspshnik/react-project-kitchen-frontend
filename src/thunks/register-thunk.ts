import { AxiosError } from 'axios';
import { batch } from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../store/store.types';
import { registerUser, jwt } from '../services/api';
import {
  userRegistrationRequested,
  userRegistrationSucceeded,
  userRegistrationFailed,
  setUser,
} from '../store';
import { makeErrorObject } from '../services/helpers';
import { TAPIError } from '../services/api.types';

const registerThunk: AppThunk = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const reg = getState().forms.register || {};
  const usernameReg = reg.username ?? '';
  const emailReg = reg.email ?? '';
  const passwordReg = reg.password ?? '';
  dispatch(userRegistrationRequested());
  try {
    const {
      data: {
        user: {
          username, email, token, bio = '', image = '',
        },
      },
    } = await registerUser(usernameReg, emailReg, passwordReg);
    jwt.set(token);
    batch(() => {
      dispatch(setUser({
        username,
        email,
        bio,
        image,
      }));
      dispatch(userRegistrationSucceeded());
    });
    jwt.set(token);
  } catch (error) {
    dispatch(
      userRegistrationFailed(makeErrorObject(error as AxiosError<TAPIError>)),
    );
  }
};

export default registerThunk;
