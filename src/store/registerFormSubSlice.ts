import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TRegisterFormState = {
  username: string | null,
  email: string | null,
  password: string | null
};

const initialState: TRegisterFormState = {
  username: null,
  email: null,
  password: null,
};

const registerFormSubSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeUsernameRegister: (
      state : TRegisterFormState,
      action: PayloadAction<string>,
    ) => ({ ...state, username: action.payload }),
    changeEmailRegister: (
      state: TRegisterFormState,
      action : PayloadAction<string>,
    ) => ({ ...state, email: action.payload }),
    changePasswordRegister: (state : TRegisterFormState, action: PayloadAction<string>) => ({
      ...state, password: action.payload,
    }),
    resetFormRegister: (state : TRegisterFormState) => ({
      ...state, ...initialState,
    }),
  },
});

const registerReducer = registerFormSubSlice.reducer;
export const {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  resetFormRegister,
} = registerFormSubSlice.actions;
export default registerReducer;
