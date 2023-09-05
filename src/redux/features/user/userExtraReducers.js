import { CodeBracketIcon } from "@heroicons/react/24/outline";
import {
  fetchUserById,
  add1Like,
  minus1Like,
  thunkAddUserLikedPosts,
  thunkRemoveUserLikedPosts,
} from "./userThunks";

export const fetchUserByIdReducers = (builder) => {
  builder
    .addCase(fetchUserById.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entireUser = action.payload;
    })
    .addCase(fetchUserById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

export const add1LikeReducers = (builder) => {
  builder
    .addCase(add1Like.pending, (state) => {
      state.status = "loading";
    })
    .addCase(add1Like.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entireUser = action.payload;
    })
    .addCase(add1Like.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

export const minus1LikeReducers = (builder) => {
  builder
    .addCase(minus1Like.pending, (state) => {
      state.status = "loading";
    })
    .addCase(minus1Like.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entireUser = action.payload;
    })
    .addCase(minus1Like.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

export const thunkAddUserLikedPostsReducers = (builder) => {
  builder
    .addCase(thunkAddUserLikedPosts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(thunkAddUserLikedPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (state.entireUser) {
        if (!state.entireUser.likedPosts) {
          state.entireUser.likedPosts = [];
        }
        if (action.payload) {
          state.entireUser.likedPosts.push(action.payload.postId);
        }
      }
    })
    .addCase(thunkAddUserLikedPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

export const thunkRemoveUserLikedPostsReducers = (builder) => {
  builder
    .addCase(thunkRemoveUserLikedPosts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(thunkRemoveUserLikedPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (state.entireUser && state.entireUser.likedPosts) {
        const index = state.entireUser.likedPosts.indexOf(
          action.payload.postId
        );
        if (index > -1) {
          state.entireUser.likedPosts.splice(index, 1);
        }
      }
    })

    .addCase(thunkRemoveUserLikedPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};
