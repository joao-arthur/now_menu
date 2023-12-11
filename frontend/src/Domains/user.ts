import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const { reducer: user, actions: userActions } = createSlice({
    name: 'user',
    initialState: {
        logged: false,
        verified: false
    },
    reducers: {
        setLogged: (state, action: PayloadAction<boolean>) => {
            state.logged = action.payload;
            state.verified = true;
        }
    }
});
