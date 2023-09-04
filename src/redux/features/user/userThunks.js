import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserById,
  addUserLikedPosts,
  removeUserLikedPosts,
} from "../../../api/users.js";
import { updatePostByLikes } from "../../../api/posts.js";

// Existing thunk for fetching user by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchByIdStatus",
  async (id, thunkAPI) => {
    try {
      const userData = await getUserById(id);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// add1Like thunk
export const add1Like = createAsyncThunk(
  "put/add1LikeStatus",
  async (id, thunkAPI) => {
    try {
      const post = await updatePostByLikes(id, 1);
      return post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//minus1Like thunk
export const minus1Like = createAsyncThunk(
  "put/minus1LikeStatus",
  async (id, thunkAPI) => {
    try {
      const post = await updatePostByLikes(id, -1);
      return post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// add postId to user's likedPosts array
export const thunkAddUserLikedPosts = createAsyncThunk(
  "user/addLikedPost",
  async ({ postId, userId }, thunkAPI) => {
    try {
      await addUserLikedPosts(userId, postId);
      return { postId }; // Return postId to be used in the fulfilled case
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// remove postId from user's likedPosts array
export const thunkRemoveUserLikedPosts = createAsyncThunk(
  "user/removeUserLikedPosts",
  async (payload, thunkAPI) => {
    const { userId, postId } = payload;
    try {
      await removeUserLikedPosts(userId, postId);
      return { postId }; // return postId similar to the add thunk
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
