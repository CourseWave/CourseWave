import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for comments
const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

// Define the base URL for the API

// Async Thunk to fetch comments for a specific course
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (courseId) => {
    const response = await axios.get(
      `http://localhost:5000/getComments/${courseId}`
    );
    return response.data.comments;
  }
);

// Async Thunk to add a new comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentData) => {
    const response = await axios.post(
      `http://localhost:5000/addComment`,
      commentData
    );
    return response.data;
  }
);

// Async Thunk to update an existing comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (commentData) => {
    const response = await axios.put(
      `http://localhost:5000/updateComment/${commentData.comment_id}`,
      commentData
    );
    return response.data;
  }
);

// Async Thunk to delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId) => {
    const response = await axios.put(
      `http://localhost:5000/deleteComment/${commentId}`
    );
    return response.data;
  }
);

// Create a slice for comments
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.comment);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const { comment_id, ...updatedComment } = action.payload;
        const existingComment = state.comments.find(
          (comment) => comment.comment_id === comment_id
        );
        if (existingComment) {
          Object.assign(existingComment, updatedComment);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) =>
            comment.comment_id !== parseInt(action.payload.comment_id)
        );
      });
  },
});

export default commentSlice.reducer;
// export { fetchComments, addComment, updateComment, deleteComment };
