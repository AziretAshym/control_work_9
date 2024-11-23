import React, { useState } from "react";
import { ICategory } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import { addCategory } from "../../store/thunks/categoryThunks.ts";

interface CategoryFormProps {
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onClose }) => {
  const initialState: ICategory = {
    type: "",
    name: "",
  };

  const [category, setCategory] = useState<ICategory>(initialState);
  const dispatch = useAppDispatch();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addCategory(category));
      setCategory(initialState);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category name"
            name="name"
            value={category.name}
            onChange={changeInput}
            required
          />
          <span className="input-group-text">Category</span>
        </div>

        <select
          className="form-select mb-3"
          name="type"
          value={category.type}
          onChange={changeInput}
          required
        >
          <option disabled value="">
            Choose type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button type="submit" className="btn btn-outline-primary">
          Add Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
