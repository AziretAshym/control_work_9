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


