import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pcategoryService from './pcategoryService'

const initialState = {
    productsCategory:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getCpoducts= createAsyncThunk(
    "product/get-products-category",
    async (thunkAPI) => {
      try {
        return await pcategoryService.getCproducts()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const productCategorySlice = createSlice({
    name: "productsCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCpoducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCpoducts.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.productsCategory = action.payload;
        })
        .addCase(getCpoducts.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.productsCategory = null;
          state.message=action.error
        });
    },
  });
  
  export default productCategorySlice.reducer;