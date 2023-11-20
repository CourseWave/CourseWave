import { configureStore } from '@reduxjs/toolkit';
import CoursesSlice from './Redux/CoursesSlice';
import CategoriesSlice from './Redux/CategoriesSlice';

const store = configureStore({
  reducer: {
    Courses: CoursesSlice,
    Categories: CategoriesSlice,
  },
});

export default store;