
import { createSlice } from '@reduxjs/toolkit';

interface Props {
    isLoggedIn: boolean,
    user:any
}

const initialState: Props = {
    isLoggedIn: false,
    user:null
};


const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }: { payload: boolean }) => {
      state.isLoggedIn = payload;
    },
    setUser: (state, { payload }: { payload: any }) => {
      state.user = payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export default slice;