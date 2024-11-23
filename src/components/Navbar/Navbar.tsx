import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal/Modal';
import TransactionForm from '../../components/TransitionForm/TransitionForm.tsx';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className="navbar bg-primary-subtle mb-5">
      <div className="container">
        <NavLink to="/" className="navbar-brand mb-0 fs-2 fw-semibold">
          Finance Tracker
        </NavLink>
        <div className="d-flex gap-3">
          <NavLink to="/categories" className="btn btn-outline-primary">
            Categories
          </NavLink>
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <TransactionForm onClose={() => setShowModal(false)} transaction={null} />
      </Modal>
    </nav>
  );
};

export default Navbar;
