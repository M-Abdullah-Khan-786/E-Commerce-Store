import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColor, deleteColorById, createColor } from "./colorService";

const initialState = {
  colors: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getColors = createAsyncThunk("/get-colors", async (thunkAPI) => {
  try {
    return await getColor();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteColor = createAsyncThunk(
  "/delete-color",
  async (id, thunkAPI) => {
    try {
      return await deleteColorById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createNewColor = createAsyncThunk(
  "/create-color",
  async (colorData, thunkAPI) => {
    try {
      return await createColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.payload;
      })
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.colors = (Array.isArray(state.colors) ? state.colors : []).filter(
          (color) => color.id !== action.meta.arg
        );
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createNewColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewColor.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        if (Array.isArray(state.colors)) {
          state.brands.push(action.payload.newColor);
        }
      })
      .addCase(createNewColor.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default colorSlice.reducer;