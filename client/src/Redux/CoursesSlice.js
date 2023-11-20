// CourseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CoursesSlice = createSlice({
  name: "Courses",
  initialState: {
    Courses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    fetchCoursesPending: (state) => {
      state.status = "loading";
    },
    fetchCoursesFulfilled: (state, action) => {
      state.status = "succeeded";
      state.Courses = action.payload;
    },
    fetchCoursesRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchCoursesPending,
  fetchCoursesFulfilled,
  fetchCoursesRejected,
} = CoursesSlice.actions;

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch(fetchCoursesPending());
    const response = await axios.get("http://localhost:3001/course");
    console.log(response);
    const courses = response.data
    console.log(courses);
    dispatch(fetchCoursesFulfilled(courses));
  } catch (error) {
    dispatch(fetchCoursesRejected(error.message));
  }
};

export default CoursesSlice.reducer;
