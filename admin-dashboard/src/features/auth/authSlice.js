import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromStorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
  user: getUserfromStorage,
  orders:[],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "user/login-admin",
  async (user, thunkAPI) => {
    try {
      const response = await authService.login(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getAllOrders= createAsyncThunk(
  "order/get-all-orders",
  async (thunkAPI) => {
    try {
      return await authService.getAllOrders()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state,action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message=action.error
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getAllOrders.rejected, (state,action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = null;
        state.message=action.error
      })
  },
});

export default authSlice.reducer;
