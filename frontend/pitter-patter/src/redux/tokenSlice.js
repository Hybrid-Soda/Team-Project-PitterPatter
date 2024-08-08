import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        grantType: "Bearer",
        accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNiIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIzMDE0MjU3LCJpYXQiOjE3MjMwMTQyNTcsImV4cCI6MTcyMzAxNTE1NywianRpIjoiMDEyOTg5MzMtOThhYy00ZTc5LTk2NGEtY2RkNjUyMjA3NDQzIn0.W48Eh4X4ez927kdb3AXfcKNGuESIXaUItqIdoX6T7EO5WSO5yn3NNEOUOB2zBzPsIy4QLjoToDESxNJJP0muEw",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOSIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIzMDE1Mjk4LCJpYXQiOjE3MjMwMTUyOTgsImV4cCI6MTcyMzYyMDA5OCwianRpIjoiNDg5MjNmMTYtNzRhMC00N2U2LTlkMDEtZmZlNWU2ZmM0MzQ1In0.SGdTN5AgsxW3_ABSAjOCRkPYosNyHCgGLkxBfZneD9bH_xkDe4uHMFalsXGghUnS2FPlcp9TmFi-sk3E2DAzgg",
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
