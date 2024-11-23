import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addCategory } from '../../store/thunks/categoryThunks';
import { ICategory } from '../../types';

interface CategoryFormProps {
  onClose: () => void;
  category: ICategory | null;
}

const CategoryForm = ({ onClose, category }: CategoryFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ICategory>({
    id: '',
    name: '',
    type: 'expense',
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please enter a category name.');
      return;
    }
    dispatch(addCategory(formData));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category Type</label>
        <select name="type"
                className="form-control mb-4"
                value={formData.type}
                onChange={handleChange}
                required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button
        className="btn btn-outline-primary"
        type="submit"
      >Save</button>
    </form>
  );
};

export default CategoryForm;
