import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCproducts, createCproduct,deleteCproductsbyId} from './pcategoryService'

const initialState = {
    productsCategory:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

export const getCpoducts= createAsyncThunk(
    "product/get-products-category",
    async (thunkAPI) => {
      try {
        return await getCproducts()
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteCpoducts = createAsyncThunk(
    "/delete-pCategory",
    async (id, thunkAPI) => {
      try {
        return await deleteCproductsbyId(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const createNewPcategory = createAsyncThunk(
    "/create-pCategory",
    async (pCategoryData, thunkAPI) => {
      try {
        return await createCproduct(pCategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const productCategorySlice = createSlice({
    name: "productsCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCpoducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCpoducts.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.productsCategory = action.payload;
        })
        .addCase(getCpoducts.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.productsCategory = null;
          state.message=action.error
        })
        .addCase(deleteCpoducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCpoducts.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.productsCategory = (Array.isArray(state.productsCategory) ? state.productsCategory : []).filter(
            (Category) => Category.id !== action.meta.arg
          );
        })
        .addCase(deleteCpoducts.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        })
        .addCase(createNewPcategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(createNewPcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          if (Array.isArray(state.productsCategory)) {
            state.productsCategory.push(action.payload.newCategory);
          }
        })
        .addCase(createNewPcategory.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.message = action.payload;
        })
    },
  });
  
  export default productCategorySlice.reducer;