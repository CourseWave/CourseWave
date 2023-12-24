import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  checkoutResult: null,
  purchasedCourses: [],
};

export const checkoutAsync = createAsyncThunk(
  "checkout/checkoutAsync",
  async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/checkout"
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getPurchasedCoursesAsync = createAsyncThunk(
  "checkout/getPurchasedCoursesAsync",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getUserCourses"
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create the Checkout slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkoutAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkoutAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.checkoutResult = action.payload;
    });
    builder.addCase(checkoutAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getPurchasedCoursesAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPurchasedCoursesAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.purchasedCourses = action.payload.courses;
    });
    builder.addCase(getPurchasedCoursesAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Export actions
// export { checkoutAsync, getPurchasedCoursesAsync };

// Export reducer
export default checkoutSlice.reducer;
