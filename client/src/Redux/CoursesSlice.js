// CourseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
axios.defaults.headers.common["Authorization"] = token;
const CoursesSlice = createSlice({
  name: "Courses",
  initialState: {
    Courses: [],
    sections: [],

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
    fetchSectionsPending: (state) => {
      state.status = "loading";
    },
    fetchSectionsFulfilled: (state, action) => {
      state.status = "succeeded";
      state.sections = action.payload;
    },
    fetchSectionsRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    createCoursePending: (state) => {
      state.status = "loading";
    },
    createCourseFulfilled: (state, action) => {
      state.status = "succeeded";
      state.Courses.push(action.payload);
    },
    createCourseRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    updateCoursePending: (state) => {
      state.status = "loading";
      state.error = null; // Clear any previous errors when starting the update
    },
    updateCourseFulfilled: (state, action) => {
      state.status = "succeeded";
      // Assuming that the state.Courses array contains the list of courses
      const index = state.Courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        state.Courses[index] = action.payload; // Update the course in the array
      }
    },
    updateCourseRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    deleteCoursePending: (state) => {
      state.status = "loading";
      state.error = null;
    },
    deleteCourseFulfilled: (state, action) => {
      state.status = "succeeded";
      state.Courses = state.Courses.filter(
        (course) => course.id !== action.payload
      );
    },
    deleteCourseRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSectionsFulfilled, (state, action) => {
      const { course_id, sections } = action.payload;
      // Find the corresponding course by course_id and update its sections
      const course = state.Courses.find((c) => c.id === course_id);
      if (course) {
        course.sections = sections;
      }
    });
    builder.addCase(addCourseVideo.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addCourseVideo.fulfilled, (state, action) => {
      state.status = "succeeded";
    
      // Assuming the server response includes the updated video data
      const { course_id, section_id, video } = action.payload;
    
      // Find the corresponding course by course_id
      const course = state.Courses.find((c) => c.id === course_id);
    
      if (course) {
        // Find the corresponding section by section_id
        const section = course.sections.find((s) => s.id === section_id);
    
        if (section) {
          // Update the section with the newly added video
          section.videos.push(video);
        }
      }
    });
    

    builder.addCase(addCourseVideo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const {
  fetchCoursesPending,
  fetchCoursesFulfilled,
  fetchCoursesRejected,
  fetchSectionsFulfilled,
  fetchSectionsPending,
  fetchSectionsRejected,
  createCoursePending,
  createCourseFulfilled,
  createCourseRejected,
  updateCoursePending,
  updateCourseFulfilled,
  updateCourseRejected,
  deleteCoursePending,
  deleteCourseFulfilled,
  deleteCourseRejected,
  addVideosToSections,
} = CoursesSlice.actions;

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch(fetchCoursesPending());
    const response = await axios.get("http://localhost:5000/getCourses");
    const courses = response.data.courses;
    dispatch(fetchCoursesFulfilled(courses));
  } catch (error) {
    dispatch(fetchCoursesRejected(error.message));
  }
};

// Async thunk for creating a new course
export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch(createCoursePending());

    const formData = new FormData();
    formData.append("course_image", courseData.image);
    formData.append("course_title", courseData.title);
    formData.append("course_description", courseData.description);
    formData.append("course_price", courseData.price);
    // formData.append("course_catagory", courseData.course_catagory);
    formData.append("course_length", courseData.course_length);
    formData.append("course_objectives", courseData.objectives);
    formData.append("course_requirements", courseData.requirements);
    formData.append("course_rate", "1");
    formData.append("course_tagline", courseData.course_tagline);

    console.log("Sending course creation request with data:", courseData);

    const response = await axios.post(
      "http://localhost:5000/addCourse",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response from createCourse:", response.data);

    const newCourse = response.data;
    dispatch(createCourseFulfilled(newCourse));
    return newCourse;
  } catch (error) {
    console.error("Error creating course:", error.message);
    dispatch(createCourseRejected(error.message));
  }
};

export const updateCourse =
  ({ courseId, updatedData }) =>
  async (dispatch) => {
    try {
      dispatch(updateCoursePending());
      const response = await axios.put(
        `http://localhost:5000/updateCourse/${courseId}`,
        updatedData
      );
      console.log(response);
      dispatch(updateCourseFulfilled({ courseId, updatedData }));
    } catch (error) {
      dispatch(updateCourseRejected(error.message));
    }
  };

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    dispatch(deleteCoursePending());
    await axios.put(`http://localhost:5000/deleteCourse/${courseId}`);
    dispatch(deleteCourseFulfilled(courseId));
  } catch (error) {
    dispatch(deleteCourseRejected(error.message));
  }
};

export const addCourseSection = createAsyncThunk(
  "courses/addCourseSection",
  async (sectionData) => {
    const formData = new FormData();

    formData.append("courseId", sectionData.courseId);
    formData.append(
      "sections",
      sectionData.sections.map((e) => e.title)
    );
    console.table({ formData });
    const response = await axios.post(
      `http://localhost:5000/addCourseSection`,
      {
        courseId: sectionData.courseId,
        sections: sectionData.sections.map((e) => e.title),
      }
    );
    return response.data;
  }
);

export const fetchSections = (course_id) => async (dispatch) => {
  try {
    dispatch(fetchSectionsPending());
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(
      `http://localhost:5000/getCourseSections/${course_id}`
    );
    const section = response.data.courseSection;
    console.log(response.data.courseSection);
    dispatch(fetchSectionsFulfilled(section));
  } catch (error) {
    dispatch(fetchSectionsRejected(error.message));
  }
};

// export const addCourseVideo = createAsyncThunk(
//   "courses/addCourseVideo",
//   async ({ course_id, course_section_id, videoData }) => {
//     const response = await axios.post(`http://localhost:5000/addCourseVideos`, {
//       course_id,
//       course_section_id,
//       videoData,
//     });
//     return response.data;
//   }
// );

export const addCourseVideo = createAsyncThunk(
  "courses/addCourseVideo",
  async ({ course_section_id, video_titles}) => {
    const data = {video_titles , course_section_id }
    console.log(data);
    try {
      const response = await axios.post(`http://localhost:5000/addCourseVideos`, {
        data
      });
      console.log(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSectionVideos = createAsyncThunk(
  "courses/fetchSectionVideos",
  async (course_section_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getSectionVideos/${course_section_id}`
      );
      return response.data.videos;
    } catch (error) {
      throw error;
    }
  }
);
export default CoursesSlice.reducer;
