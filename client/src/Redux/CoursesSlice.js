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
      state.Courses.push(action.payload.course);
    },
    createCourseRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    createCourseSectionPending: (state) => {
      state.status = "loading";
    },
    createCourseSectionFulfilled: (state, action) => {
      state.status = "succeeded";
      action.payload.forEach((e) => {
        state.sections.push(e);
      });
    },
    createCourseSectionRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateCoursePending: (state) => {
      state.status = "loading";
      state.error = null; // Clear any previous errors when starting the update
    },

    updateCourseSectionPending: (state) => {
      state.status = "loading";
      state.error = null; // Clear any previous errors when starting the update
    },
    updateCourseSectionFulfilled: (state, action) => {
      state.status = "succeeded";
      const index = state.sections.findIndex(
        (course) =>
          course.course_section_id === action.payload.course_section_id
      );

      if (index !== -1) {
        state.sections[index].section_name = action.payload.section_name; // Update the course in the array
      }
    },
    updateCourseFulfilled: (state, action) => {
      state.status = "succeeded";
      const updatedData = {};
      const courseData = action.payload.courseData;
      updatedData["course_id"] = action.payload.courseId;
      updatedData["course_image"] = courseData.image;
      updatedData["course_title"] = courseData.title;
      updatedData["course_description"] = courseData.description;
      updatedData["course_price"] = courseData.price;
      updatedData["category_id"] = courseData.category_id;
      updatedData["course_length"] = courseData.course_length;
      updatedData["course_objectives"] = courseData.objectives;
      updatedData["course_requirements"] = courseData.requirements;
      updatedData["course_rate"] = "5";
      updatedData["course_tagline"] = courseData.course_tagline;
      updatedData["course_category"] = courseData.course_category;

      const index = state.Courses.findIndex(
        (course) => course.course_id === action.payload.courseId
      );

      if (index !== -1) {
        state.Courses[index] = updatedData; // Update the course in the array
      }
    },
    updateCourseRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateCourseSectionRejected: (state, action) => {
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
        (course) => course.course_id !== action.payload
      );
    },
    deleteCourseRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    deleteCourseSectionPending: (state) => {
      state.status = "loading";
      state.error = null;
    },

    deleteCourseSectionFulfilled: (state, action) => {
      state.status = "succeeded";
      state.sections = state.sections.filter(
        (course) => course.course_section_id !== action.payload
      );
    },

    deleteCourseSectionRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    fetchSectionVideosPending: (state) => {
      state.status = "loading"; // Update the status to loading while fetching videos
    },

    fetchSectionVideosFulfilled: (state, action) => {
      const { course_section_id, videos } = action.payload;
      const section = state.sections.find(
        (section) => section.id === course_section_id
      );

      if (section) {
        section.videos = videos;
        state.status = "succeeded"; // Update the status to succeeded after fetching videos
      }
    },

    fetchSectionVideosRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload; // Store the error message in the state
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
    builder.addCase(fetchSectionsRejected, (state, action) => {
    });
    builder.addCase(addCourseVideos.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addCourseVideos.fulfilled, (state, action) => {
      state.status = "succeeded";

      // Assuming the server response includes the updated video data
      // const { course_id, section_id, video } = action.payload;

      // // Find the corresponding course by course_id
      // const course = state.Courses.find((c) => c.id === course_id);

      // if (course) {
      //   // Find the corresponding section by section_id
      //   const section = course.sections.find((s) => s.id === section_id);

      //   if (section) {
      //     // Update the section with the newly added video
      //     section.videos.push(video);
      //   }
      // }
    });

    builder.addCase(addCourseVideos.rejected, (state, action) => {
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
  fetchSectionVideosPending,
  fetchSectionVideosFulfilled,
  fetchSectionVideosRejected,
  updateCourseSectionPending,
  updateCourseSectionFulfilled,
  updateCourseSectionRejected,
  deleteCourseSectionPending,
  deleteCourseSectionFulfilled,
  deleteCourseSectionRejected,
  createCourseSectionFulfilled,
  createCourseSectionPending,
  createCourseSectionRejected,
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

export const getCourseById = async (courseId) => {
  const result = await axios.get(`http://localhost:5000/getCourse/${courseId}`);
  return result?.data?.course || {};
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
    formData.append("category_id", parseInt(courseData.category_id));
    formData.append("course_length", courseData.course_length);
    formData.append("course_objectives", courseData.objectives);
    formData.append("course_requirements", courseData.requirements);
    formData.append("course_rate", "5");
    formData.append("course_tagline", courseData.course_tagline);


    const response = await axios.post(
      "http://localhost:5000/addCourse",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    const newCourse = response.data;
    dispatch(createCourseFulfilled(newCourse));
    return newCourse;
  } catch (error) {
    console.error("Error creating course:", error.message);
    dispatch(createCourseRejected(error.message));
  }
};

export const addCourseSection = (sectionData) => async (dispatch) => {
  try {
    dispatch(createCourseSectionPending());

    const response = await axios.post(
      `http://localhost:5000/addCourseSection`,
      {
        courseId: sectionData.courseId,
        sections: sectionData.sections.map((e) => e.title),
      }
    );
    const newCourse = response.data?.newCourseSection;
    dispatch(createCourseSectionFulfilled(newCourse));
    return newCourse;
  } catch (error) {
    console.error("Error creating course:", error.message);
    dispatch(createCourseSectionRejected(error.message));
  }
};

export const updateCourse =
  ({ courseId, courseData }) =>
  async (dispatch) => {
    try {
      dispatch(updateCoursePending());
      const obj = {};
      obj["course_title"] = courseData.title;
      obj["course_description"] = courseData.description;
      obj["course_price"] = courseData.price;
      obj["course_category"] = courseData.course_category;
      obj["category_id"] = parseInt(courseData.category_id);
      obj["course_length"] = courseData.course_length;
      obj["course_objectives"] = courseData.objectives;
      obj["course_requirements"] = courseData.requirements;
      obj["course_rate"] = "5";
      obj["course_tagline"] = courseData.course_tagline;

      await axios.put(`http://localhost:5000/updateCourse/${courseId}`, {
        ...obj,
      });
      dispatch(updateCourseFulfilled({ courseId, courseData }));
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

export const fetchSections = (course_id) => async (dispatch) => {
  try {
    dispatch(fetchSectionsPending());
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(
      `http://localhost:5000/getCourseSections/${course_id}`
    );
    const section = response.data.courseSection;
    dispatch(fetchSectionsFulfilled(section));
  } catch (error) {
    dispatch(fetchSectionsFulfilled([]));
  }
};

export const updateCourseSection =
  ({ course_section_id, section_name }) =>
  async (dispatch) => {
    try {
      dispatch(updateCourseSectionPending());
      await axios.put(
        `http://localhost:5000/updateCourseSection/${course_section_id}`,
        { section_name }
      );
      dispatch(
        updateCourseSectionFulfilled({ course_section_id, section_name })
      );
    } catch (error) {
      dispatch(updateCourseSectionRejected(error.message));
    }
  };

export const deleteCourseSection = (course_section_id) => async (dispatch) => {
  try {
    dispatch(deleteCourseSectionPending());
    await axios.put(
      `http://localhost:5000/deleteCourseSection/${course_section_id}`
    );
    dispatch(deleteCourseSectionFulfilled(course_section_id));
  } catch (error) {
    dispatch(deleteCourseSectionRejected(error.message));
  }
};

export const addCourseVideos = createAsyncThunk(
  "courses/addCourseVideos",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/addCourseVideos`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSectionVideos = createAsyncThunk(
  "courses/fetchSectionVideos",
  async (course_section_id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchSectionVideosPending());

      const response = await axios.get(
        `http://localhost:5000/getSectionVideos/${course_section_id}`
      );

      dispatch(
        fetchSectionVideosFulfilled({
          course_section_id,
          videos: response.data.videos,
        })
      );

      return response.data;
    } catch (error) {
      dispatch(fetchSectionVideosRejected(error.message));

      return rejectWithValue(error.message);
    }
  }
);

export default CoursesSlice.reducer;
