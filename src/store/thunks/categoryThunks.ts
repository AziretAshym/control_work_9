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
      console.log('Fetched categories from API:', response.data); // Для отладки
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

export const editCategory = createAsyncThunk<ICategory, { id: string; changes: ICategory }>(
  'category/updateCategory',
  async ({ id, changes }: { id: string; changes: ICategory }) => {
    const response = await axiosApi.put(`/categories/${id}.json`, changes);
    return response.data;
  }
);
