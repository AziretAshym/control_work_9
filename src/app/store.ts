import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from '../store/slices/categoriesSlices.ts';
import { transactionReducer } from '../store/slices/transactionSlice.ts';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    transitions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
