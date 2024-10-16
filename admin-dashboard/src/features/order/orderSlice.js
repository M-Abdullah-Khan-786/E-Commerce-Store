import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from './orderService'

const initialState = {
    orders:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getOrders= createAsyncThunk(
    "order/get-orders",
    async (thunkAPI) => {
      try {
        return await orderService.getOrders()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getOrders.pending, (state) => {
          state.loading = true;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.orders = null;
          state.message=action.error
        });
    },
  });
  
  export default orderSlice.reducer;