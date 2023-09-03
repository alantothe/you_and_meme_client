import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userId: null,
    likes: [],
    inLikes: true,
  },
  reducers: {
    addUserToRedux: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.user_id;
      state.likes = action.payload.likedPosts;
    },
    addLike: (state, action) => {
      state.likes.push(action.payload); // Pushing the ID into the array
    },
    removeLike: (state, action) => {
      state.likes = state.likes.filter((id) => id !== action.payload); // Removing the ID from the array
    },
  },
});

export const { addUserToRedux, addLike, removeLike } = userSlice.actions;

export default userSlice.reducer;
