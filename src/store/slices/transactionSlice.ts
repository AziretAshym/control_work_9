import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction
} from '../thunks/transactionThunks';

interface TransactionState {
  transactions: ITransaction[];
  loadings: {
    fetching: boolean;
    add: boolean;
    delete: boolean;
    update: boolean;
  };
}

const initialState: TransactionState = {
  transactions: [],
  loadings: {
    fetching: false,
    add: false,
    delete: false,
    update: false,
  },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loadings.fetching = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
        state.loadings.fetching = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loadings.fetching = false;
      })

      .addCase(addTransaction.pending, (state) => {
        state.loadings.add = true;
      })
      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
        state.loadings.add = false;
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state) => {
        state.loadings.add = false;
      })

      .addCase(deleteTransaction.pending, (state) => {
        state.loadings.delete = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => {
        state.loadings.delete = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.loadings.delete = false;
      })

      .addCase(editTransaction.pending, (state) => {
        state.loadings.update = true;
      })
      .addCase(editTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
        state.loadings.update = false;
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(editTransaction.rejected, (state) => {
        state.loadings.update = false;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
