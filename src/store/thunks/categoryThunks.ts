import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import axiosApi from '../../AxiosApi.ts';

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category: ICategory) => {
    try {
      const response = await axiosApi.post("/categories.json", category);
      return { id: response.data.name, ...category };
    } catch (e) {
      console.error(e);
    }
  }
);