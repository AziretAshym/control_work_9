import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTransactions, deleteTransaction } from "../../store/thunks/transactionThunks";
import Spinner from "../../components/UI/Spinner/Spinner";
import { ITransaction } from "../../types";
import TransactionForm from "../../components/TransitionForm/TransitionForm.tsx";
import Modal from "../../components/Modal/Modal";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, loadings } = useAppSelector((state) => state.transitions);
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotal = (type: 'income' | 'expense') => {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const incomeTotal = calculateTotal('income');
  const expenseTotal = calculateTotal('expense');
  const total = incomeTotal - expenseTotal;

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const handleEdit = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">Transactions</h3>
      {loadings.fetching ? (
        <div className="my-4">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h4>Total: {total}</h4>
          </div>
          {transactions.map((transaction: ITransaction) => (
            <div key={transaction.id} className="card w-50 mb-4 mx-auto">
              <div className="p-3 d-flex justify-content-between">
                <p>{new Date(transaction.time).toLocaleDateString()}</p>
                <strong>{transaction.amount}</strong>
                <p>{transaction.type}</p>
                <div>
                  <button className="btn btn-outline-primary" onClick={() => handleEdit(transaction)}>
                    Edit
                  </button>
                  <button className="btn btn-outline-danger ms-3" onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={isModalOpen} onClose={handleCloseEdit}>
        {editingTransaction && (
          <TransactionForm onClose={handleCloseEdit} transaction={editingTransaction}/>
        )}
      </Modal>
    </div>
  );
};

export default Transactions;
