import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import { fetchTransactions, addTransaction} from '../thunks/transactionThunks';

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

  },
});

export const transactionReducer = transactionSlice.reducer;
