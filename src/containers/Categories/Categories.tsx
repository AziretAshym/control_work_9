import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCategories } from "../../store/thunks/categoryThunks";
import Spinner from "../../components/UI/Spinner/Spinner";
import { ICategory } from "../../types";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import Modal from "../../components/Modal/Modal";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loadings } = useAppSelector((state) => state.category);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedCategory(null);
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
        <div className="my-4">
          <Spinner />
        </div>
      ) : (
        <div>
          {categories.map((category) => (
            <div key={category.id} className="card w-50 mb-4 mx-auto">
              <div className="p-3 d-flex justify-content-between">
                <h5>{category.name}</h5>
                <p>{category.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal show={showModal} onClose={handleCloseModal}>
          <CategoryForm onClose={handleCloseModal} category={selectedCategory} />
        </Modal>
      )}
    </div>
  );
};

export default Categories;
