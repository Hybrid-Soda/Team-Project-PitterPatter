import React from "react";
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import tokenSlice from "./tokenSlice";
import itemSlice from "./itemSlice";
import childSlice from "./childSlice";

export const store = configureStore({
    reducer: {
      user: userSlice,
      token: tokenSlice,
      item: itemSlice,
      child: childSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  })

