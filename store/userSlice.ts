// store/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "idle";
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
