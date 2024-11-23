import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTransaction } from '../../store/thunks/transactionThunks';
import { ITransaction } from '../../types';
import Spinner from '../UI/Spinner/Spinner';
import { fetchCategories } from '../../store/thunks/categoryThunks';

interface TransactionFormProps {
  onClose: () => void;
  transaction: ITransaction | null;
}

const TransactionForm = ({ onClose, transaction }: TransactionFormProps) => {
  const dispatch = useAppDispatch();
  const { categories, loadings } = useAppSelector((state) => state.category);

  const [formData, setFormData] = useState<ITransaction>({
    id: '',
    time: '',
    amount: 0,
    type: 'income',
    categoryId: '',
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.amount) {
      alert('Please fill out all fields.');
      return;
    }

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
      time: new Date().toISOString(),
    };

    dispatch(addTransaction(transactionData));
    onClose();
  };

  const filteredCategories = categories.filter((category) => category.type === formData.type);

  return (
    <form onSubmit={handleSubmit}>
      {loadings.fetching ? (
        <Spinner />
      ) : (
        <>
          <div>
            <label>Amount</label>
            <input
              className="form-control"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label>Type</label>
            <select
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <select
              name="categoryId"
              className="form-control mb-4"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>
          </div>
          <button className="btn btn-outline-primary" type="submit">
            Save
          </button>
        </>
      )}
    </form>
  );
};

export default TransactionForm;
