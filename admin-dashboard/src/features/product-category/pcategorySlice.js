import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCproducts, createCproduct,deleteCproductsbyId,getSingleCproduct,updateCproduct} from './pcategoryService'

const initialState = {
    productsCategory:[],
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
    singleproductsCategory: null,
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
    "product/delete-products-category",
    async (id, thunkAPI) => {
      try {
        return await deleteCproductsbyId(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const createNewPcategory = createAsyncThunk(
    "product/create-products-category",
    async (pCategoryData, thunkAPI) => {
      try {
        return await createCproduct(pCategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const updateExistingPcategory = createAsyncThunk(
    "product/update-products-category",
    async ({ id, pCategoryData }, thunkAPI) => {
      try {
        return await updateCproduct(id, pCategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchSinglePcategory = createAsyncThunk(
    "product/get-single-products-category",
    async (id, thunkAPI) => {
      try {
        const response = await getSingleCproduct(id);
        return response;
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
        .addCase(updateExistingPcategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateExistingPcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          if (Array.isArray(state.colors)) {
            state.productsCategory = state.colors.map(category =>
              category.id === action.payload.id ? action.payload : category
            );
          } else {
            state.productsCategory = [action.payload];
          }      
          state.message = "Product category updated successfully";
        })
        .addCase(updateExistingPcategory.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.message = action.payload || "Error updating Product category";
        })
        .addCase(fetchSinglePcategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchSinglePcategory.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;
          state.singleproductsCategory = action.payload || null;
        })
        .addCase(fetchSinglePcategory.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export default productCategorySlice.reducer;