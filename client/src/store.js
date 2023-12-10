import { configureStore } from '@reduxjs/toolkit';
import CoursesSlice from './Redux/CoursesSlice';
import CategoriesSlice from './Redux/CategoriesSlice';
import { userReducer } from './Redux/UsersSlice';
import CartSlice from './Redux/CartSlice';
import CheckoutSlice from './Redux/CheckoutSlice';
const store = configureStore({
  reducer: {
    Courses: CoursesSlice,
    Categories: CategoriesSlice,
    user: userReducer,
    cart: CartSlice,
    checkout: CheckoutSlice,
  },
});

export default store;