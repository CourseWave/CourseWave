// liveSessionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get("token");
axios.defaults.headers.common["Authorization"] = token;

export const fetchLiveSessions = createAsyncThunk('liveSessions/fetch', async () => {
  try {
    const response = await axios.get("http://localhost:5000/getLiveSessions");
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error || 'Failed to retrieve live sessions');
  }
});
// export const fetchLiveSessionById = createAsyncThunk('liveSessions/fetch', async (session_id) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/getLiveSession/${session_id}`);
//     return response.data;
//   } catch (error) {
//     throw Error(error.response.data.error || 'Failed to retrieve live sessions');
//   }
// });

export const createLiveSession = createAsyncThunk('liveSessions/create', async (sessionData) => {
  try {
    const response = await axios.post("http://localhost:5000/createLiveSession", sessionData);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error || 'Failed to create live session');
  }
});

export const updateLiveSession = createAsyncThunk('liveSessions/update', async ({ session_id, sessionUpdates }) => {
  try {
    const response = await axios.put(`http://localhost:5000/updateLiveSession/${session_id}`, sessionUpdates);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error || 'Failed to update live session');
  }
});

export const deleteLiveSession = createAsyncThunk('liveSessions/delete', async (session_id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/deleteLiveSession/${session_id}`);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error || 'Failed to delete live session');
  }
});

const liveSessionsSlice = createSlice({
  name: 'liveSessions',
  initialState: {
    liveSessions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveSessions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLiveSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.liveSessions = action.payload.liveSessions;
      })
      .addCase(fetchLiveSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createLiveSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createLiveSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.liveSessions.push(action.payload.liveSession);
      })
      .addCase(createLiveSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateLiveSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLiveSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.liveSessions.findIndex(session => session.id === action.payload.updatedSession.id);
        if (index !== -1) {
          state.liveSessions[index] = action.payload.updatedSession;
        }
      })
      .addCase(updateLiveSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteLiveSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteLiveSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.liveSessions = state.liveSessions.filter(session => session.id !== action.payload.deletedSession.id);
      })
      .addCase(deleteLiveSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default liveSessionsSlice.reducer;
