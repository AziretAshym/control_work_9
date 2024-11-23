import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import axiosApi from '../../AxiosApi.ts';

export const fetchTransactions = createAsyncThunk<ITransaction[]>(
  'transaction/fetchTransactions',
  async () => {
    const response = await axiosApi.get('/transactions.json');
    const data = response.data;

    return Object.keys(data || {}).map((id) => ({
      id,
      ...data[id],
    }));
  }
);

export const addTransaction = createAsyncThunk<ITransaction, ITransaction>(
  'transaction/addTransaction',
  async (transaction) => {
    const response = await axiosApi.post('/transactions.json', transaction);
    return { id: response.data.name, ...transaction };
  }
);

export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (id: string) => {
    await axiosApi.delete(`/transactions/${id}.json`);
    return id;
  }
);

export const editTransaction = createAsyncThunk(
  'transaction/update',
  async (transaction: ITransaction) => {
    const response = await axiosApi.put(
      `/transactions/${transaction.id}.json`, transaction
    );
    return response.data;
  }
);

