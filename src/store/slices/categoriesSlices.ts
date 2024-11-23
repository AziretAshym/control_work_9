import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../types";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
} from "../thunks/categoryThunks.ts";

interface CategoryState {
  categories: ICategory[];
  loadings: {
    add: boolean;
    fetching: boolean;
    delete: boolean;
  };
}

const initialState: CategoryState = {
  categories: [],
  loadings: {
    add: false,
    fetching: false,
    delete: false,
  },
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
      .addCase(addCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.loadings.add = false;
          state.categories.push(action.payload);
        }
      )
      .addCase(addCategory.rejected, (state) => {
        state.loadings.add = false;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.loadings.fetching = true;
      })
      .addCase(fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.loadings.fetching = false;
          state.categories = action.payload; // Установка всех категорий
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.loadings.fetching = false;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loadings.delete = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
          state.loadings.delete = false;
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload
          );
        }
      )
      .addCase(deleteCategory.rejected, (state) => {
        state.loadings.delete = false;
      })

  },
});

export const categoryReducer = categorySlice.reducer;
