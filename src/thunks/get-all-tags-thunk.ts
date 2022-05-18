import { batch } from 'react-redux';
import { AxiosError } from 'axios';
import { fetchTags } from '../services/api';
import {
  setAllTags,
  tagsFetchFailed,
  tagsFetchRequested,
  tagsFetchSucceeded,
} from '../store';
import { AppThunk } from '../store/store.types';
import { TAPIError } from '../services/api.types';
import { makeErrorObject } from '../services/helpers';

const getAllTagsThunk : AppThunk = () => async (dispatch) => {
  try {
    dispatch(tagsFetchRequested());
    const { data: { tags } } = await fetchTags();
    dispatch(setAllTags(tags));
    batch(() => {
      dispatch(setAllTags(tags));
      dispatch(tagsFetchSucceeded());
    });
  } catch (error) {
    dispatch(tagsFetchFailed(makeErrorObject(error as AxiosError<TAPIError>)));
  }
};

export default getAllTagsThunk;
