import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from './uploadService'

const initialState = {
    images:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const uploadImg= createAsyncThunk(
    "upload/images",
    async (data,thunkAPI) => {
      try {
        return await uploadService.uploadImg(data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(uploadImg.pending, (state) => {
          state.loading = true;
        })
        .addCase(uploadImg.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.images = action.payload;
        })
        .addCase(uploadImg.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.images = null;
          state.message=action.error
        });
    },
  });
  
  export default imageSlice.reducer;