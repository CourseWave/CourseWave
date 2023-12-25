// CartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  status: "idle",
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartPending: (state) => {
      state.status = "loading";
    },
    addToCartFulfilled: (state, action) => {
      const newCartItem = action.payload;

      // Check if the course with the same course_id already exists in cartItems
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.course_id === newCartItem.course_id
      );

      if (existingCartItemIndex !== -1) {
        // If the course exists, you might want to update the quantity or handle it accordingly
        state.cartItems[existingCartItemIndex].quantity +=
          newCartItem.quantity || 1;
      } else {
        // If the course doesn't exist, add it to cartItems
        state.status = "succeeded";
        state.cartItems.push(newCartItem);
      }
    },

    addToCartRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    removeFromCartPending: (state) => {
      state.status = "loading";
    },
    removeFromCartFulfilled: (state, action) => {
      console.log(action);
      state.status = "succeeded";
      state.cartItems = state.cartItems.filter(
        (item) => item.order_id !== action.payload.order_id
      );
    },
    removeFromCartRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    getCartItemsPending: (state) => {
      state.status = "loading";
    },
    getCartItemsFulfilled: (state, action) => {
      console.log(action.payload);
      state.status = "succeeded";
      state.cartItems = action.payload;
    },
    getCartItemsRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    getTotalAmountPending: (state) => {
      state.status = "loading";
    },
    getTotalAmountFulfilled: (state, action) => {
      state.status = "succeeded";
      state.totalAmount = action.payload;
    },
    getTotalAmountRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  addToCartPending,
  addToCartFulfilled,
  addToCartRejected,
  removeFromCartPending,
  removeFromCartFulfilled,
  removeFromCartRejected,
  getCartItemsPending,
  getCartItemsFulfilled,
  getCartItemsRejected,
  getTotalAmountPending,
  getTotalAmountFulfilled,
  getTotalAmountRejected,
} = CartSlice.actions;

export const addToCartAsync = (course_id) => async (dispatch) => {
  try {
    dispatch(addToCartPending());
    const response = await axios.post(
      `http://localhost:5000/addToCart`, {course_id}
    );
    dispatch(addToCartFulfilled(response.data.cartItem));
  } catch (error) {
    dispatch(addToCartRejected(error.response.data));
  }
};


export const removeFromCartAsync = (order_id) => async (dispatch) => {
  try {
    dispatch(removeFromCartPending());
    const response = await axios.put(
      `http://localhost:5000/deleteCartItem`, {order_id}
    );
    dispatch(removeFromCartFulfilled(response.data.cartItem));
  } catch (error) {
    dispatch(
      removeFromCartRejected(
        error.response ? error.response.data : { error: "Unknown error" }
      )
    );
  }
};

export const getCartItemsAsync = () => async (dispatch) => {
  try {
    dispatch(getCartItemsPending());
    const response = await axios.get("http://localhost:5000/getCartItems");
    dispatch(getCartItemsFulfilled(response.data.cartItems));
  } catch (error) {
    dispatch(getCartItemsRejected(error.response.data));
  }
};

export const getTotalAmountAsync = () => async (dispatch) => {
  try {
    dispatch(getTotalAmountPending());
    const response = await axios.get("http://localhost:5000/getTotalAmount");
    dispatch(getTotalAmountFulfilled(response.data.total_amount));
  } catch (error) {
    dispatch(getTotalAmountRejected(error.response.data));
  }
};

export default CartSlice.reducer;
