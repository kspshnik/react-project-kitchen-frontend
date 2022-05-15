import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import {
  followProfileDeleteRequested,
  followProfileDeleteSucceeded,
  followProfileDeleteFailed,
  setViewProfile,
} from '../store';
import { deleteFollowProfile } from '../services/api';
import { AppThunk, AppDispatch, RootState } from '../store/store.types';
import { TAPIProfile, TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const unfollowProfileThunk: AppThunk = () => async (
  dispatch : AppDispatch,
  getState : () => RootState,
) => {
  const { profile } = getState().view;
  const username = !!profile && !!profile.username ? profile.username : '';
  profile.nickname ? profile.nickname : '';
  console.log(profile);
  dispatch(followProfileDeleteRequested());
  try {
    const { data } = await deleteFollowProfile(username) as AxiosResponse<TAPIProfile>;
    batch(() => {
      dispatch(setViewProfile(data.profile));
      dispatch(followProfileDeleteSucceeded());
    });
  } catch (error) {
    dispatch(followProfileDeleteFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default unfollowProfileThunk;
