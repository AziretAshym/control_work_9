import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCategories, deleteCategory } from "../store/thunks/categoryThunks";
import Spinner from '../components/UI/Spinner/Spinner.tsx';
import Modal from '../components/Modal/Modal.tsx';
import CategoryForm from '../components/CategoryForm/CategoryForm.tsx';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loadings } = useAppSelector((state) => state.category);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">Categories</h3>
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-primary" onClick={handleAddClick}>Add</button>
      </div>

      {loadings.fetching ? (
        <div className="d-flex justify-content-center my-4"><Spinner /></div>
      ) : (
        <div>
          {categories.map((category) => (
            <div key={category.id} className="w-50 mb-4 mx-auto">
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <h5 className="card-title m-0">{category.name}</h5>
                  <p className="card-text m-0">Type: {category.type}</p>
                  <div>
                    <button className="btn btn-outline-primary">Update</button>
                    <button
                      className="btn btn-outline-danger ms-2"
                      onClick={() => handleDelete(category.id!)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onClose={handleCloseModal}>
        <CategoryForm onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Categories;
