import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  students: [],
  teachers: [],
  status: 'idle',
  error: null,
//   user:null,
};

// Define the base URL for your API (assuming it's served from the same host)
// const baseURL = 'http://localhost:3000'; // Update with your actual URL

// Define async thunk for fetching students
export const fetchStudents = createAsyncThunk('user/fetchStudents', async () => {
  const response = await axios.get(' http://localhost:3001/student');
  return response.data;
});

// Define async thunk for fetching teachers
export const fetchTeachers = createAsyncThunk('user/fetchTeachers', async () => {
  const response = await axios.get('http://localhost:3001/teacher');
  return response.data;
});

// Create a slice of the Redux store
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching students
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetching teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
