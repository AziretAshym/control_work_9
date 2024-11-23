import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory, ICategoryApi } from '../../types';
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


export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await axiosApi.get<ICategoryApi>("/categories.json");
      const data = response.data;


      const categories: ICategory[] = Object.keys(data || {}).map((id) => ({
        id,
        ...data[id],
      }));
      return categories;
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string) => {
    try {
      await axiosApi.delete(`/categories/${id}.json`);
      return id;
    } catch (e) {
      console.error(e);
    }
  }
);

