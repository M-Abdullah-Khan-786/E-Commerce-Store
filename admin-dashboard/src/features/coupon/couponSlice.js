import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCoupon,
  deleteCouponById,
  createCoupon,
  getSingleCoupon,
  updateCoupon,
} from "./couponService";

const initialState = {
  coupons: [],
  singleCoupon: null,
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getCoupons = createAsyncThunk("/get-coupons", async (thunkAPI) => {
  try {
    return await getCoupon();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteCoupon = createAsyncThunk(
  "/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await deleteCouponById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createNewCoupon = createAsyncThunk(
  "/create-coupon",
  async (couponData, thunkAPI) => {
    try {
      return await createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingCoupon = createAsyncThunk(
  "/update-coupon",
  async ({ id, couponData }, thunkAPI) => {
    try {
      return await updateCoupon(id, couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleCoupon = createAsyncThunk(
  "/get-single-coupon",
  async (id, thunkAPI) => {
    try {
      const response = await getSingleCoupon(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.coupons = (Array.isArray(state.coupons) ? state.coupons : []).filter(
          (coupon) => coupon.id !== action.meta.arg
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createNewCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.coupons)) {
          state.coupons.push(action.payload.newCoupon);
        }
      })
      .addCase(createNewCoupon.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExistingCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.coupons)) {
          state.coupons = state.coupons.map((coupon) =>
            coupon.id === action.payload.id ? action.payload : coupon
          );
        } else {
          state.brands = [action.payload];
        }
        state.message = "Coupon updated successfully";
      })
      .addCase(updateExistingCoupon.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload || "Error updating coupon";
      })
      .addCase(fetchSingleCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.singleCoupon = action.payload || null;
      })
      .addCase(fetchSingleCoupon.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = couponSlice.actions;

export default couponSlice.reducer;
