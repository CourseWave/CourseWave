import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

// Async Thunk to fetch messages
export const fetchMessages = createAsyncThunk("contactUs/fetchMessages", async () => {
  const response = await axios.get("http://localhost:5000/getMessages" ) ;
  return response.data;
});

// Async Thunk to send a new message
export const sendMessage = createAsyncThunk("contactUs/sendMessage", async (messageData) => {
  const response = await axios.post("http://localhost:5000/sendMessage", messageData);
  return response.data;
});

// Async Thunk to delete a message
export const deleteMessage = createAsyncThunk("contactUs/deleteMessage", async (messageId) => {
  const response = await axios.put("http://localhost:5000/deleteMessage", { message_id: messageId });
  return response.data;
});

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(message => message.message_id !== action.payload.deleted_message_id);
      });
  },
});

export default contactUsSlice.reducer;
