import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBrand, deleteBrandById, createBrand, getSingleBrand, updateBrand } from "./brandService";

const initialState = {
  brands: [],
  singleBrand: null,
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getBrands = createAsyncThunk("/get-brands", async (thunkAPI) => {
  try {
    return await getBrand();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

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

export const createNewBrand = createAsyncThunk(
  "/create-brand",
  async (brandData, thunkAPI) => {
    try {
      return await createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingBrand = createAsyncThunk(
  "/update-brand",
  async ({ id, brandData }, thunkAPI) => {
    try {
      return await updateBrand(id, brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleBrand = createAsyncThunk(
  "/get-single-brand",
  async (id, thunkAPI) => {
    try {
      const response = await getSingleBrand(id);
      return response;
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
        state.message = action.error;
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
      })
      .addCase(createNewBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.brands)) {
          state.brands.push(action.payload.newBrand);
        }
      })
      .addCase(createNewBrand.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExistingBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.brands)) {
          state.brands = state.brands.map(brand =>
            brand.id === action.payload.id ? action.payload : brand
          );
        } else {
          state.brands = [action.payload];
        }      
        state.message = "Brand updated successfully";
      })
      .addCase(updateExistingBrand.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload || "Error updating brand";
      })
      .addCase(fetchSingleBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.singleBrand = action.payload || null;
      })
      .addCase(fetchSingleBrand.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default brandSlice.reducer;
