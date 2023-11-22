import { configureStore } from '@reduxjs/toolkit';
import CoursesSlice from './Redux/CoursesSlice';
import CategoriesSlice from './Redux/CategoriesSlice';
import { userReducer } from './Redux/UsersSlice';
const store = configureStore({
  reducer: {
    Courses: CoursesSlice,
    Categories: CategoriesSlice,
    user: userReducer,
  },
});

export default store;