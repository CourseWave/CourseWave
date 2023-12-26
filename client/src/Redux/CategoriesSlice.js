// categoriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/getCategories");
      return response.data.categories;
    } catch (error) {
      throw Error(error.response.data.error || "Failed to retrieve categories");
    }
  }
);

const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/createCategory",
        categoryData
      );
      return response.data.category;
    } catch (error) {
      throw Error(error.response.data.error || "Failed to create category");
    }
  }
);

const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, category_name }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/updateCategory/${categoryId}`,
        { category_name }
      );
      return response.data.category;
    } catch (error) {
      throw Error(error.response.data.error || "Failed to update category");
    }
  }
);

const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/deleteCategory/${categoryId}`
      );
      return response.data.category;
    } catch (error) {
      throw Error(error.response.data.error || "Failed to delete category");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categories.findIndex(
          (category) => category.category_id === action.payload.category_id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.filter(
          (category) => category.category_id !== action.payload.category_id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchCategories, createCategory, updateCategory, deleteCategory };

export default categoriesSlice.reducer;
