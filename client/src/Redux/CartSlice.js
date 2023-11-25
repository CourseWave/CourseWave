import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const courseToAdd = action.payload;

      // Check if the course is already in the cart
      const existingCourse = state.cartItems.find(item => item.id === courseToAdd.id);

      if (existingCourse) {
        // If the course is already in the cart, you might want to update quantity or handle it based on your logic
        // For simplicity, this example assumes you only add unique courses to the cart
        console.log('Course is already in the cart!');
      } else {
        // If the course is not in the cart, add it
        state.cartItems.push(courseToAdd);
      }
    },
    removeFromCart: (state, action) => {
      const courseIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== courseIdToRemove);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
