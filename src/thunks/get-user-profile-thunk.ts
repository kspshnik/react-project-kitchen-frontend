import { AxiosError, AxiosResponse } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  profileFetchRequested,
  profileFetchFailed,
  profileFetchSucceeded,
  setViewProfile,
} from '../store';
import { fetchProfile } from '../services/api';
import { TAPIError, TAPIProfile } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getUserProfileThunk: AppThunk = (user: string) => async (dispatch) => {
  try {
    dispatch(profileFetchRequested());
    const {
      data: {
        profile: {
          username = '', email = '', bio, image, following = false,
        },
      },
    } = await fetchProfile(user) as AxiosResponse<TAPIProfile>;
    dispatch(setViewProfile({
      username, email, bio, image, following,
    }));
    dispatch(profileFetchSucceeded());
  } catch (error) {
    dispatch(profileFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getUserProfileThunk;
