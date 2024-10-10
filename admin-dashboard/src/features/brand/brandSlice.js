import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from './brandService'

const initialState = {
    brands:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getBrands= createAsyncThunk(
    "customer/get-brands",
    async (thunkAPI) => {
      try {
        return await brandService.getBrands()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBrands.pending, (state) => {
          state.loading = true;
        })
        .addCase(getBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.brands = action.payload;
        })
        .addCase(getBrands.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.brands = null;
          state.message=action.error
        });
    },
  });
  
  export default brandSlice.reducer;