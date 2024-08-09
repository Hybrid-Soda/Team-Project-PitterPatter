import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// import userSlice from "./userSlice";
import tokenSlice from "./tokenSlice";
import itemSlice from "./itemSlice";
import childSlice from "./childSlice";

const reducers = combineReducers({
  token: tokenSlice,
  item: itemSlice,
  child: childSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'item', 'child',],
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV!== "production",
})

export default store;

// export const store = configureStore({
//     reducer: {
//       // user: userSlice,
//       token: tokenSlice,
//       item: itemSlice,
//       child: childSlice,
//     },
//     devTools: process.env.NODE_ENV !== "production",
//   })

