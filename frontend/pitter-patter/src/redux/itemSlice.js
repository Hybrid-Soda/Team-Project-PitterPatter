import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assetsApi } from '../apiService';
import axios from 'axios';

const initialState = {
    itemList: [],
    frameItem: [],
    backgroundItem: [],
    status: 'idle',
    error: null,
};

export const fetchItemList = createAsyncThunk(
    'item/fetchItemList',
    async (childId, thunkAPI) => {
        try {
            const response = await axios.get(`${assetsApi}/item`, {
                params: { childId }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.itemList = action.payload;
                // state.frameItem = action.payload.filter(item => item.itemType === 'FRAME');
                // state.backgroundItem = action.payload.filter(item => item.itemType === 'BACKGROUND');
            })
            .addCase(fetchItemList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : action.error.message;
            });
    },
});

export default itemSlice.reducer;
