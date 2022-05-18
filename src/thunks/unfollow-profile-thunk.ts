import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import {
  followProfileDeleteRequested,
  followProfileDeleteSucceeded,
  followProfileDeleteFailed,
  setViewProfile,
} from '../store';
import { deleteFollowProfile } from '../services/api';
import { AppThunk } from '../store/store.types';
import { TAPIProfile, TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const unfollowProfileThunk: AppThunk = () => async (dispatch, getState) => {
  const { profile } = getState().view;
  const username = !!profile && !!profile.username ? profile.username : '';
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
