import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        teamName: null,
        email: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.teamName = action.payload.teamName;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.userId = null;
            state.teamName = null;
            state.email = null;
            state.isLoggedIn = false;
        },
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
