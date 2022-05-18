import { AxiosError, AxiosResponse } from 'axios';
import { AppThunk } from '../store/store.types';
import {
  profileFetchRequested,
  profileFetchFailed,
  profileFetchSucceeded,
  setViewProfile, setProfileFetchNotFound,
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
          username = '', email = '', bio, image, following = false, nickname,
        },
      },
    } = await fetchProfile(user) as AxiosResponse<TAPIProfile>;
    dispatch(setViewProfile({
      username, email, bio, image, following, nickname,
    }));
    dispatch(profileFetchSucceeded());
  } catch (error) {
    const { response } = error as AxiosError<TAPIError>;
    if (response && response?.status === 404) {
      dispatch(setProfileFetchNotFound());
    }
    dispatch(profileFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};
export default getUserProfileThunk;
