import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from './ProductService'

const initialState = {
    products:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getPoducts= createAsyncThunk(
    "product/get-products",
    async (thunkAPI) => {
      try {
        return await productService.getProducts()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPoducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(getPoducts.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.products = action.payload;
        })
        .addCase(getPoducts.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.products = null;
          state.message=action.error
        });
    },
  });
  
  export default productSlice.reducer;