import React from "react";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import tokenSlice from "./tokenSlice";

export const store = configureStore({
    reducer: {
      user: userReducer,
      token: tokenSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  })

