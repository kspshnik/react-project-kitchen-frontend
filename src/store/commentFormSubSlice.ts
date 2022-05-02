import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TCommentFormState = {
  comment: string | null,
};

const initialState : TCommentFormState = {
  comment: null,
};

const commentSubSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComment: (state : TCommentFormState, action: PayloadAction<string>) => ({
      ...state, comment: action.payload,
    }),
    resetComment: (state :TCommentFormState) => ({
      ...state, ...initialState,
    }),
  },
});

const commentReducer = commentSubSlice.reducer;
export const {
  setComment,
  resetComment,
} = commentSubSlice.actions;

export default commentReducer;
