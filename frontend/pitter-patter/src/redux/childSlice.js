import { createSlice } from "@reduxjs/toolkit";

const childSlice = createSlice({
    name: 'child',
    initialState: {
        id: null,
        profileImage: null,
        nickname: null,
        gender: null,
        birth: null,
        personalRecord: null,
        point: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setChild: (state, action) => {
            state.id = action.payload.id;
            state.profileImage = action.payload.profileImage;
            state.nickname = action.payload.nickname;
            state.gender = action.payload.gender;
            state.birth = action.payload.birth;
            state.personalRecord = action.payload.personalRecord;
            state.point = action.payload.point;
            state.status = 'succeeded';
        },
        clearChild: (state) => {
            state.id = null;
            state.profileImage = null;
            state.nickname = null;
            state.gender = null;
            state.birth = null;
            state.personalRecord = null;
            state.point = null;
            state.status = 'idle';
            state.error = null;
        },
        setChildError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const { setChild, clearChild, setChildError } = childSlice.actions;
export default childSlice.reducer;
