import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./message";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    isLoggedIn: authReducer,
  },
});
