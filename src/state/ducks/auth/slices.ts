
import { createSlice } from '@reduxjs/toolkit';

interface Props {
    isLoggedIn: boolean
}

const initialState: Props = {
    isLoggedIn: false,
};


const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, { payload }: { payload: boolean }) => {
            state.isLoggedIn = payload;
        },
        logoutUser: () => {
            return initialState;
        },
    },
});

export default slice;