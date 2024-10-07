import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customer from './customer'

const initialState = {
    customers:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getUsers= createAsyncThunk(
    "customer/get-customers",
    async (thunkAPI) => {
      try {
        return await customer.getUsers()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const customerSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.customers = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.customers = null;
          state.message=action.error
        });
    },
  });
  
  export default customerSlice.reducer;