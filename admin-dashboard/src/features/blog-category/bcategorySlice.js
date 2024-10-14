import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcategoryService from './bcategoryService'

const initialState = {
    blogssCategory:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getCblogs= createAsyncThunk(
    "product/get-blog-category",
    async (thunkAPI) => {
      try {
        return await bcategoryService.getCblogs()
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
            state.blogssCategory = action.payload;
        })
        .addCase(getCblogs.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.blogssCategory = null;
          state.message=action.error
        });
    },
  });
  
  export default blogCategorySlice.reducer;