import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userId: null,
  },
  reducers: {
    addUserToRedux: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.user_id;
    },
  },
});

export const { addUserToRedux } = userSlice.actions;

export default userSlice.reducer;
