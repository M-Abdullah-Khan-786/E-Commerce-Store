import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from './colorService'

const initialState = {
    colors:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getColors= createAsyncThunk(
    "/get-colors",
    async (thunkAPI) => {
      try {
        return await colorService.getColors()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const brandSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getColors.pending, (state) => {
          state.loading = true;
        })
        .addCase(getColors.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })
        .addCase(getColors.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.colors = null;
          state.message=action.error
        });
    },
  });
  
  export default brandSlice.reducer;