import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from './blogService'

const initialState = {
    blogs:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getBlogs= createAsyncThunk(
    "blog/get-blogs",
    async (thunkAPI) => {
      try {
        return await blogService.getBlogs()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBlogs.pending, (state) => {
          state.loading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.blogs = null;
          state.message=action.error
        });
    },
  });
  
  export default blogSlice.reducer;