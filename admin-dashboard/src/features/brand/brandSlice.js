import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getBrand,deleteBrandById} from './brandService'

const initialState = {
    brands:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getBrands= createAsyncThunk(
    "/get-brands",
    async (thunkAPI) => {
      try {
        return await getBrand()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const deletebrand = createAsyncThunk(
    "/delete-color",
    async (id, thunkAPI) => {
      try {
        return await deleteBrandById(id);
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
        })
        .addCase(deletebrand.pending, (state) => {
          state.loading = true;
        })
        .addCase(deletebrand.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.colors = (Array.isArray(state.brands) ? state.brands : []).filter(
            (brand) => brand.id !== action.meta.arg
          );
        })
        .addCase(deletebrand.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        });
    },
  });
  
  export default brandSlice.reducer;