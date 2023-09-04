import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserByIdReducers,
  add1LikeReducers,
  minus1LikeReducers,
  thunkAddUserLikedPostsReducers,
  thunkRemoveUserLikedPostsReducers,
} from "./userExtraReducers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    entireUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    fetchUserByIdReducers(builder);
    add1LikeReducers(builder);
    minus1LikeReducers(builder);
    thunkAddUserLikedPostsReducers(builder);
    thunkRemoveUserLikedPostsReducers(builder);
  },
});

export default userSlice.reducer;
