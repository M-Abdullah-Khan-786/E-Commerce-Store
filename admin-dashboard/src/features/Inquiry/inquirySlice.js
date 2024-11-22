import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getInquirys} from './inquiryService'

const initialState = {
    inquiry:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getInquiry= createAsyncThunk(
    "inquiry/get-inquiry",
    async (thunkAPI) => {
      try {
        return await getInquirys()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const inquirySlice = createSlice({
    name: "inquiry",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getInquiry.pending, (state) => {
          state.loading = true;
        })
        .addCase(getInquiry.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.inquiry = action.payload;
        })
        .addCase(getInquiry.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.inquiry = null;
          state.message=action.error
        });
    },
  });
  
  export default inquirySlice.reducer;