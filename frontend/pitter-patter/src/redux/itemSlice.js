import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assetsApi } from '../apiService';

// 착용 아이템 정보 GET
export const getItem = createAsyncThunk(
    'item/getItem',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const childId = state.child.id; 
            const token = state.token.refreshToken;
            const response = await assetsApi.get(`/item-property/${childId}/on`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response.data); // 응답 데이터 출력
            return response.data;
        } catch (error) {
            console.log('API Error:', error.response.data); // 에러 데이터 출력
            console.log(token);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        frameItem: 1,
        backgroundItem: 1,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                state.frameItem = action.payload[0] ? action.payload[0].id : 1;
                state.backgroundItem = action.payload[1]? action.payload[1].id : 1;
            })
            .addCase(getItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : action.error.message;
            });
    },
});

export default itemSlice.reducer;
