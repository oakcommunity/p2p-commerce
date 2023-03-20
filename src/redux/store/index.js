import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./message";
import usersReducer from "./users";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer,
  },
});
