import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./ProductService";

const initialState = {
  products: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getPoducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-product",
  async (data, thunkAPI) => {
    try {
      return await productService.createProduct(data);
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
        state.products = [];
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products.push(action.payload.newProduct);
        state.message = "Product created successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
