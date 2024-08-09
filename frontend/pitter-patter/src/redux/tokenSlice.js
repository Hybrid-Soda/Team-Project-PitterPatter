import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        grantType: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.grantType = action.payload.grantType;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        clearToken: (state) => {
            state.grantType = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
