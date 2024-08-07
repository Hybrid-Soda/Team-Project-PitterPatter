import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { childApi } from "../apiService";

// 사용자 정보를 가져오는 비동기 액션 정의
export const getChild = createAsyncThunk(
    'child/getChild',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const childId = state.child.id; 
            const token = state.token.refreshToken;
            const response = await childApi.get(`/${childId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response.data); // 응답 데이터 출력
            return response.data;
        } catch (error) {
            console.log('API Error:', error.response.data); // 에러 데이터 출력
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const childSlice = createSlice({
    name: 'child',
    initialState: {
        id: 24,
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
        },
        clearChild: (state) => {
            state.id = null;
            state.profileImage = null;
            state.nickname = null;
            state.gender = null;
            state.birth = null;
            state.personalRecord = null;
            state.point = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChild.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getChild.fulfilled, (state, action) => {
                console.log('getChild fulfilled:', action.payload); // 성공 시 데이터 출력
                state.id = action.payload.data.id;
                state.profileImage = action.payload.data.profileImage;
                state.nickname = action.payload.data.nickname;
                state.gender = action.payload.data.gender;
                state.birth = action.payload.data.birth;
                state.personalRecord = action.payload.data.personalRecord;
                state.point = action.payload.data.point;
                state.status = 'succeeded';
            })
            .addCase(getChild.rejected, (state, action) => {
                console.log('getChild rejected:', action.payload); // 실패 시 데이터 출력
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { setUser, logoutUser } = childSlice.actions;
export default childSlice.reducer;
