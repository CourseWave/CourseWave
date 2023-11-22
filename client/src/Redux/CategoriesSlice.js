// CategoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const CategoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    fetchCategoriesPending: (state) => {
      state.status = "loading";
    },
    fetchCategoriesFulfilled: (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    },
    fetchCategoriesRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesPending,
  fetchCategoriesFulfilled,
  fetchCategoriesRejected,
} = CategoriesSlice.actions;

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesPending());
    const response = await axios.get("http://localhost:3001/categories");
    const categories = response.data;
    dispatch(fetchCategoriesFulfilled(categories));
  } catch (error) {
    dispatch(fetchCategoriesRejected(error.message));
  }
};

export default CategoriesSlice.reducer;
