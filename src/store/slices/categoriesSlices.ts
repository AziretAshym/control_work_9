import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import { addCategory } from '../thunks/categoryThunks.ts';

interface categoryState {
  categories: ICategory[];
  loadings: {
    add: boolean;
  }
}

const initialState: categoryState = {
  categories: [],
  loadings: {
    add: false,
  }
};


const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
      state.loadings.add = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
      state.loadings.add = false;
      })
      .addCase(addCategory.rejected, (state) => {
      state.loadings.add = false;
      })

  },
});

export const categoryReducer = categorySlice.reducer;
