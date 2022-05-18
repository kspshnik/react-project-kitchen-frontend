import { AxiosError, AxiosResponse } from 'axios';
import { batch } from 'react-redux';
import {
  followProfilePostRequested,
  followProfilePostSucceeded,
  followProfilePostFailed,
  setViewProfile,
} from '../store';
import { postFollowProfile } from '../services/api';
import { AppThunk } from '../store/store.types';
import { TAPIProfile, TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const followProfileThunk: AppThunk = () => async (dispatch, getState) => {
  const { profile } = getState().view;
  const username = !!profile && !!profile.username ? profile?.username : '';

  dispatch(followProfilePostRequested());
  try {
    const { data } = await postFollowProfile(username) as AxiosResponse<TAPIProfile>;
    batch(() => {
      dispatch(setViewProfile(data.profile));
      dispatch(followProfilePostSucceeded());
    });
  } catch (error) {
    dispatch(followProfilePostFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default followProfileThunk;
