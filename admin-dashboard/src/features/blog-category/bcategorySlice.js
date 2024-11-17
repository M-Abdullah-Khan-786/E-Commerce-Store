import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCblog,deleteCblogbyId, createCblog, updateCblog, getSingleCblog} from './bcategoryService'

const initialState = {
    blogsCategory:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
    singleblogsCategory: null,
  };

export const getCblogs= createAsyncThunk(
    "blog/get-blogs-category",
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
    "blog/create-blogs-category",
    async (bCategoryData, thunkAPI) => {
      try {
        return await createCblog(bCategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const updateExistingBcategory = createAsyncThunk(
    "blog/update-blogs-category",
    async ({ id, bCategoryData }, thunkAPI) => {
      try {
        return await updateCblog(id, bCategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchSingleBcategory = createAsyncThunk(
    "blog/get-single-blogs-category",
    async (id, thunkAPI) => {
      try {
        const response = await getSingleCblog(id);
        return response;
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
        .addCase(updateExistingBcategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateExistingBcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          if (Array.isArray(state.blogsCategory)) {
            state.blogsCategory = state.blogsCategory.map(category =>
              category.id === action.payload.id ? action.payload : category
            );
          } else {
            state.blogsCategory = [action.payload];
          }      
          state.message = "Blog category updated successfully";
        })
        .addCase(updateExistingBcategory.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.message = action.payload || "Error updating Blog category";
        })
        .addCase(fetchSingleBcategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchSingleBcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.singleblogsCategory = action.payload || null;
        })
        .addCase(fetchSingleBcategory.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export default blogCategorySlice.reducer;