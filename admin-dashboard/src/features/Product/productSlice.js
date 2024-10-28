import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, createProducts, deleteProducts } from "./ProductService";

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
      return await getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-product",
  async (data, thunkAPI) => {
    try {
      return await createProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await deleteProducts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
        state.products = [...(state.products || []), action.payload];
        state.message = "Product created successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Error creating product";
      })
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products = (Array.isArray(state.products) ? state.products : []).filter(
          (product) => product.id !== action.meta.arg
        );
        state.message = "Product deleted successfully";
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Error deleting product";
      });
  },
});

export default productSlice.reducer;