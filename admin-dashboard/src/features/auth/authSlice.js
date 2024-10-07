import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "./Auth";

const getUserfromStorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
  user: getUserfromStorage,
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
      })
      .addCase(login.rejected, (state,action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message=action.error
      });
  },
});

export default authSlice.reducer;
