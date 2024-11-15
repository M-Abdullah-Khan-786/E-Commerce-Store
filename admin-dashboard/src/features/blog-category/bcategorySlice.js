import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCblog,deleteCblogbyId, createCblog} from './bcategoryService'

const initialState = {
    blogsCategory:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getCblogs= createAsyncThunk(
    "blog/get-blog-category",
    async (thunkAPI) => {
      try {
        return await getCblog()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteCblogs = createAsyncThunk(
    "blog/delete-blogs-category",
    async (id, thunkAPI) => {
      try {
        return await deleteCblogbyId(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const createNewBcategory = createAsyncThunk(
    "blogs/create-blogs-category",
    async (bCategoryData, thunkAPI) => {
      try {
        return await createCblog(bCategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const blogCategorySlice = createSlice({
    name: "blogsCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCblogs.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCblogs.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.blogsCategory = action.payload;
        })
        .addCase(getCblogs.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.blogsCategory = null;
          state.message=action.error
        })
        .addCase(deleteCblogs.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCblogs.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.blogsCategory = (Array.isArray(state.blogsCategory) ? state.blogsCategory : []).filter(
            (Category) => Category.id !== action.meta.arg
          );
        })
        .addCase(deleteCblogs.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        })
        .addCase(createNewBcategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(createNewBcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          if (Array.isArray(state.blogsCategory)) {
            state.blogsCategory.push(action.payload.newCategory);
          }
        })
        .addCase(createNewBcategory.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.message = action.payload;
        })
    },
  });
  
  export default blogCategorySlice.reducer;