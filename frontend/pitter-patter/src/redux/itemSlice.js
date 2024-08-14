import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { assetsApi } from "../apiService";

// 착용 아이템 정보 GET
export const getItem = createAsyncThunk("item/getItem", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const childId = state.child.id;
    const token = state.token.accessToken;
    const response = await assetsApi.get(`/item-property/${childId}/on`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response:", response.data); // 응답 데이터 출력
    return response.data;
  } catch (error) {
    console.log("API Error:", error.response.data); // 에러 데이터 출력
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    frameItem: 1,
    backgroundItem: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    clearItem: (state) => {
      state.frameItem = 1;
      state.backgroundItem = 1;
      state.status = "idle";
      state.error = null;
    },
    setItem: (state, action) => {
      if (Array.isArray(action.payload)) {
        // payload가 배열인 경우
        state.frameItem = action.payload[1].id;
        state.backgroundItem = action.payload[0].id;
      } else {
        // payload가 객체인 경우
        if (action.payload.frameItem !== undefined) {
          state.frameItem = action.payload.frameItem;
        }
        if (action.payload.backgroundItem !== undefined) {
          state.backgroundItem = action.payload.backgroundItem;
        }
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.frameItem = action.payload[1] ? action.payload[1].id : 1;
        state.backgroundItem = action.payload[0] ? action.payload[0].id : 1;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      });
  },
});

// 액션 생성자(export 하기)
export const { clearItem, setItem } = itemSlice.actions;

export default itemSlice.reducer;
