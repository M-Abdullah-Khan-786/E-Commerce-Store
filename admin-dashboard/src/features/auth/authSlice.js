import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "./Auth";

const userState = {
  _id: null,
  firstname: null,
  lastname: null,
  email: null,
  phone: null,
  token: null,
};

const initialState = {
  user: userState,
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "user/login-admin",
  async (user, thunkAPI) => {
    try {
      const response = await auth.login(user);
      return response;
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
        console.log(action);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
