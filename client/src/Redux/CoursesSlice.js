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
      state.error = null; // Clear any previous errors when starting the delete
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

    // addObjective: (state, action) => {
    //   const { courseId, objective } = action.payload;
    //   const course = state.Courses.find(
    //     (course) => course.course_id === courseId
    //   );
    //   if (course) {
    //     // Assuming a course has an 'objectives' array, you can push the new objective
    //     course.objectives = objective;
    //   }
    // },

    // updateObjective: (state, action) => {
    //   const { courseId, updatedObjective } = action.payload;
    //   const course = state.Courses.find(
    //     (course) => course.course_id === courseId
    //   );
    //   if (course) {
    //     course.objectives = updatedObjective;
    //   }
    // },

    // deleteObjective: (state, action) => {
    //   const { courseId, objectiveId } = action.payload;
    //   const course = state.Courses.find(
    //     (course) => course.course_id === courseId
    //   );
    //   if (course) {
    //     // Assuming a course has an 'objectives' array, you can filter out the deleted objective
    //     course.objectives = "";
    //   }
    // },

    // addRequirement: (state, action) => {
    //   const { courseId, requirement } = action.payload;
    //   const course = state.Courses.find(
    //     (course) => course.course_id === courseId
    //   );
    //   if (course) {
    //     // Assuming a course has a 'requirements' array, you can push the new requirement
    //     course.requirements = requirement;
    //   }
    // },

    // updateRequirement: (state, action) => {
    //   const { courseId, requirementId, updatedRequirement } = action.payload;
    //   const course = state.Courses.find((course) => course.id === courseId);
    //   if (course) {
    //     // Assuming a course has a 'requirements' array, you can update the specific requirement
    //     const index = course.requirements.findIndex(
    //       (req) => req.id === requirementId
    //     );
    //     if (index !== -1) {
    //       course.requirements[index] = updatedRequirement;
    //     }
    //   }
    // },

    // deleteRequirement: (state, action) => {
    //   const { courseId, requirementId } = action.payload;
    //   const course = state.Courses.find((course) => course.id === courseId);
    //   if (course) {
    //     // Assuming a course has a 'requirements' array, you can filter out the deleted requirement
    //     course.requirements = course.requirements.filter(
    //       (req) => req.id !== requirementId
    //     );
    //   }
    // },
  },
  extraReducers: (builder) => {
    // ... (previous extraReducers)

    builder
      .addCase(addCourseSection.fulfilled, (state, action) => {
        // Handle the state update after adding a new section
        // For example, assuming action.payload contains the new section data
        state.Courses = state.Courses.map((course) => {
          if (course.id === action.payload.course_id) {
            // Assuming your course has a 'sections' array, you can push the new section
            course.sections.push(action.payload.section);
          }
          return course;
        });
      })
      .addCase(addCourseVideo.fulfilled, (state, action) => {
        // Handle the state update after adding a new video
        // For example, assuming action.payload contains the new video data
        state.Courses = state.Courses.map((course) => {
          course.sections = course.sections.map((section) => {
            if (section.id === action.payload.course_section_id) {
              // Assuming your section has a 'videos' array, you can push the new video
              section.videos.push(action.payload.video);
            }
            return section;
          });
          return course;
        });
      });
    // Additional cases for other CRUD operations, sections, and videos if needed
  },
});

export const {
  fetchCoursesPending,
  fetchCoursesFulfilled,
  fetchCoursesRejected,
  createCoursePending,
  createCourseFulfilled,
  createCourseRejected,
  updateCoursePending,
  updateCourseFulfilled,
  updateCourseRejected,
  deleteCoursePending,
  deleteCourseFulfilled,
  deleteCourseRejected,
  // addObjective,
  // updateObjective,
  // deleteObjective,
  // addRequirement,
  // updateRequirement,
  // deleteRequirement,
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
    const z = {};
    // Create FormData object
    const formData = new FormData();

    // Append data to FormData

    z["course_image"] = courseData["image"];
    z["course_title"] = courseData["title"];
    z["course_description"] = courseData["description"];
    z["course_price"] = courseData["price"];
    z["course_catagory"] = courseData["course_catagory"];
    z["course_length"] = courseData["course_length"];
    z["course_rate"] = "1";

    Object.keys(z).forEach((key) => {
      formData.append(key, z[key]);
    });
    const response = await axios.post(
      "http://localhost:5000/addCourse",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      }
    );
    console.log(response);

    const newCourse = response.data;
    dispatch(createCourseFulfilled(newCourse));
    return newCourse;
  } catch (error) {
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

// export const addObjectiveAsync = createAsyncThunk(
//   "courses/addObjective",
//   async (objectiveData) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/addCourseObject/${objectiveData.course_id}`,
//         { object: objectiveData.object }
//       );
//       return response.data;
//     } catch (error) {
//       // Handle error
//       throw error;
//     }
//   }
// );

// export const updateObjectiveAsync = createAsyncThunk(
//   "courses/updateObjective",
//   async (objectiveData) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/updateCourseObject/${objectiveData.course_object_id}`,
//         objectiveData.objective
//       );
//       return response.data;
//     } catch (error) {
//       // Handle error
//       throw error;
//     }
//   }
// );

// export const deleteObjectiveAsync = createAsyncThunk(
//   "courses/deleteObjective",
//   async (objectiveData) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/deleteCourseObject/${objectiveData.course_object_id}`
//       );
//       return response.data;
//     } catch (error) {
//       // Handle error
//       throw error;
//     }
//   }
// );

// export const addRequirementAsync = createAsyncThunk(
//   "courses/addRequirement",
//   async (requirementData) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/addCourseRequirement/${requirementData.course_id}`,
//         { requirement: requirementData.requirement }
//       );
//       return response.data;
//     } catch (error) {
//       // Handle error
//       throw error;
//     }
//   }
// );

// export const updateRequirementAsync = createAsyncThunk(
//   "courses/updateRequirement",
//   async (requirementData) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/updateCourseRequirement/${requirementData.course_requirement_id}`,
//         requirementData
//       );
//       return response.data;
//     } catch (error) {
//       // Handle error
//       throw error;
//     }
//   }
// );

// export const deleteRequirementAsync = createAsyncThunk(
//   "courses/deleteRequirement",
//   async (requirementData) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/deleteCourseRequirement/${requirementData.course_requirement_id}`
//       );
//       return response.data;
//     } catch (error) {
//       // Handle error
//       throw error;
//     }
//   }
// );

export const addCourseSection = createAsyncThunk(
  "courses/addCourseSection",
  async ({ course_id, sectionData }) => {
    const response = await axios.post(
      `http://localhost:5000//addCourseSection/${course_id}`,
      {
        sections: sectionData, // Expecting sectionData to be an array of objects
      }
    );
    return response.data;
  }
);

// Async Thunk for adding a new video to a course section
// Update the parameters to take courseData and videoData separately
// export const addCourseVideo = createAsyncThunk(
//   "courses/addCourseVideo",
//   async ({ course_id, course_section_id, videoData }) => {
//     console.log(course_id, course_section_id, videoData);
//     const response = await axios.post(`http://localhost:5000//addCourseVideos/`, {
//       course_id,
//       course_section_id,
//       videoData,
//     });
//     return response.data;
//   }
// );
export const addCourseVideo = createAsyncThunk(
  "courses/addCourseVideo",
  async ({ course_id, course_section_id, videoData }) => {
    const response = await axios.post(`http://localhost:5000/addCourseVideos`, {
      course_id,
      course_section_id,
      videoData,
    });
    return response.data;
  }
);

export default CoursesSlice.reducer;
