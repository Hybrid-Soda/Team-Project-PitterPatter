import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userApi } from "../apiService";

// 사용자 정보를 가져오는 비동기 액션 정의
export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${userApi}/user`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNiIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIyOTkyNjI1LCJpYXQiOjE3MjI5OTI2MjUsImV4cCI6MTcyMzU5NzQyNSwianRpIjoiOTJkMzdkYjEtNmQ2ZC00MzQxLTk5MTQtNWFjZmQ4MTNiZWFlIn0.53pqQTDwTGgv_l3vlRLOLlN1MEwC0qafz_lZs8Fz0jF88FMSB6-4H2xTZQeuenIkTuHGHngDKvHuy7MbbzHjOg`,
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        email: null,
        isLoggedIn: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                console.log('getUser fulfilled:', action.payload); // 성공 시 데이터 출력
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.isLoggedIn = true;
                state.status = 'succeeded';
            })
            .addCase(getUser.rejected, (state, action) => {
                console.log('getUser rejected:', action.payload); // 실패 시 데이터 출력
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
