import authService, { userLoginPayload, userRegistrationPayload } from '@/services/auth-service/auth-service';;
import slice from './slices';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@/state/store';

const {
  actions: { setLoggedIn },
} = slice;

const userLoginThunk = createAsyncThunk(
  "auth/login",
  async (payload: userLoginPayload) => {
    const response = await authService.userLogin(payload);
    return response;
  }
);

const setLoginThunk = (payload:boolean) => (dispatch: AppDispatch) => {
  dispatch(setLoggedIn(payload));
};

const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: userRegistrationPayload) => {
    const response = await authService.userRegistration(payload);
    return response;
  }
);


const authThunk = { userLoginThunk,setLoginThunk, registerThunk };

export default authThunk;
