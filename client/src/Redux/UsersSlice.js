import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import axios from "axios";

// Define initial state
const initialState = {
  students: [],
  teachers: [],
  status: "idle",
  error: null,
  user: null,
};
const token = Cookies.get("token");
axios.defaults.headers.common["Authorization"] = token;
// Define async thunk for fetching students
export const fetchStudents = createAsyncThunk(
  "user/fetchStudents",
  async () => {
    const response = await axios.get(" http://localhost:5000/getUsers");
    console.log(response.data.users);
    return response.data.users;
  }
);

// Define async thunk for fetching teachers
export const fetchTeachers = createAsyncThunk(
  "user/fetchTeachers",
  async () => {
    const response = await axios.get("http://localhost:5000/getTrainers");
    console.log(response.data);
    return response.data.trainers;
  }
);

export const signupUserAsync = createAsyncThunk(
  "user/signupUser",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:5000/userSignup",
      userData
    );
    return response.data;
  }
);

// Async thunk for trainer signup
export const signupTrainerAsync = createAsyncThunk(
  "user/signupTrainer",
  async (trainerData) => {
    const response = await axios.post(
      "http://localhost:5000/trainerSignup",
      trainerData
    );
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginData) => {
    return axios
      .post("http://localhost:5000/loginUser", loginData)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return { error: e.response.data.error };
      });
  }
);

// Async thunk for trainer login
export const loginTrainerAsync = createAsyncThunk(
  "user/loginTrainer",
  async (loginData) => {
    return axios
      .post("http://localhost:5000/loginTrainer", loginData)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return { error: e.response.data.error };
      });
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateData) => {
    const response = await axios.put("/updateUser", updateData);
    return response.data;
  }
);

// Async thunk for updating trainer information
export const updateTrainerAsync = createAsyncThunk(
  "user/updateTrainer",
  async (updateData) => {
    const response = await axios.put("/updateTrainer", updateData);
    return response.data;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (deleteData) => {
    const response = await axios.put("/deleteUser", deleteData);
    return response.data;
  }
);

// Async thunk for deleting trainer
export const deleteTrainerAsync = createAsyncThunk(
  "user/deleteTrainer",
  async (deleteData) => {
    const response = await axios.put("/deleteTrainer", deleteData);
    return response.data;
  }
);
export const emptyStudent = createAsyncThunk("user/emptyStudent", async () => {
  return [];
});

// Create a slice of the Redux store
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedUserInfo: (state, action) => {
      // Update user information in the state
      state.user = action.payload;
    },

    // Example reducer for updating trainer information
    updateTrainerInfo: (state, action) => {
      // Update trainer information in the state
      state.trainerInfo = action.payload;
    },

    setUserState: (state, action) => {
      state.user = action.payload;
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Handle fetching students
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetching teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signupTrainerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(loginTrainerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateTrainerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null; // Reset user data after deletion
      })
      .addCase(deleteTrainerAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null; // Reset user data after deletion
      })
      .addCase(emptyStudent.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null; // Reset user data after deletion
      });
  },
});

// Export actions and reducer
export const { loggedUserInfo, updateTrainerInfo, setUserState } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
