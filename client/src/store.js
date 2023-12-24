import { configureStore } from '@reduxjs/toolkit';
import CoursesSlice from './Redux/CoursesSlice';
import CategoriesSlice from './Redux/CategoriesSlice';
import { userReducer } from './Redux/UsersSlice';
import CartSlice from './Redux/CartSlice';
import CheckoutSlice from './Redux/CheckoutSlice';
import liveSessionsSlice from './Redux/liveSessionsSlice';
const store = configureStore({
  reducer: {
    Courses: CoursesSlice,
    Categories: CategoriesSlice,
    user: userReducer,
    cart: CartSlice,
    checkout: CheckoutSlice,
    liveSessions: liveSessionsSlice,
  },
});

export default store;