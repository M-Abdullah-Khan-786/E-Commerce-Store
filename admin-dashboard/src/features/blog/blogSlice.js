import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getBlogs,createBlogs,deleteBlogs,getBlogById,updateBlog} from './blogService'

const initialState = {
    blogs:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
    singleBlog: null
  };

export const getBlog= createAsyncThunk(
    "blog/get-blogs",
    async (thunkAPI) => {
      try {
        return await getBlogs()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async (data, thunkAPI) => {
      try {
        return await createBlogs(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deleteBlogById = createAsyncThunk(
    "blog/delete-blog",
    async (id, thunkAPI) => {
      try {
        return await deleteBlogs(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const updateBlogById = createAsyncThunk(
    "blog/update-blog",
    async ({ id, data }, thunkAPI) => {
      try {
        return await updateBlog(id, data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const getBlogByIds = createAsyncThunk(
    "blog/get-blog-by-id",
    async (id, thunkAPI) => {
      try {
        return await getBlogById(id);
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
        .addCase(getBlog.pending, (state) => {
          state.loading = true;
        })
        .addCase(getBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getBlog.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.blogs = null;
          state.message=action.error
        })
        .addCase(createBlog.pending, (state) => {
          state.loading = true;
        })
        .addCase(createBlog.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.products = [...(state.products || []), action.payload];
          state.message = "Product created successfully";
        })
        .addCase(createBlog.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload || "Error creating product";
        })
        .addCase(deleteBlogById.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteBlogById.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.products = (Array.isArray(state.products) ? state.products : []).filter(
            (product) => product.id !== action.meta.arg
          );
          state.message = "Product deleted successfully";
        })
        .addCase(deleteBlogById.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload || "Error deleting product";
        })
        .addCase(updateBlogById.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateBlogById.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          if (Array.isArray(state.blogs)) {
            state.blogs = state.blogs.map(blog =>
              blog.id === action.payload.id ? action.payload : blog
            );
          } else {
            state.blogs = [action.payload];
          }      
          state.message = "Blog updated successfully";
        })
        .addCase(updateBlogById.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload || "Error updating blog";
        })
        .addCase(getBlogByIds.pending, (state) => {
          state.loading = true;
        })
        .addCase(getBlogByIds.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.singleBlog = action.payload;
          state.message = "Blog fetched successfully";
        })
        .addCase(getBlogByIds.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload || "Error fetching blog";
        });
    },
  });
  
  export default blogSlice.reducer;