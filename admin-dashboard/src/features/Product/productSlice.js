import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct, createProducts, deleteProducts, updateProduct, getProductById } from "./productService";

const initialState = {
  products: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
  singleProduct: null
};

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await getProduct();
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

export const updateProductById = createAsyncThunk(
  "product/update-product",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateProduct(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductByIds = createAsyncThunk(
  "product/get-product-by-id",
  async (id, thunkAPI) => {
    try {
      return await getProductById(id);
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
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.products)) {
          state.products.push(action.payload.product);
        }
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
      })
      .addCase(updateProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.products)) {
          state.products = state.products.map(product =>
            product.id === action.payload.id ? action.payload : product
          );
        } else {
          state.products = [action.payload];
        }      
        state.message = "Product updated successfully";
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Error updating product";
      })
      .addCase(getProductByIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
        state.message = "Product fetched successfully";
      })
      .addCase(getProductByIds.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Error fetching product";
      });
  },
});

export default productSlice.reducer;