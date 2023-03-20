import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      console.log("AAAA");
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setMessage } = authSlice.actions;
export default authSlice.reducer;
