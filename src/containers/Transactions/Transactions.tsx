import  { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTransactions } from "../../store/thunks/transactionThunks";
import Spinner from "../../components/UI/Spinner/Spinner";
import { ITransaction } from "../../types";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, loadings } = useAppSelector((state) => state.transitions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="container">
      <h3 className="text-center mb-4">Transactions</h3>
      {loadings.fetching ? (
        <div className="my-4">
          <Spinner />
        </div>
      ) : (
        <div>
          {transactions.map((transaction: ITransaction) => (
            <div key={transaction.id} className="card w-50 mb-4 mx-auto">
              <div className="p-3 d-flex justify-content-between">
                <p>{transaction.time}</p>
                <strong>{transaction.amount}</strong>
                <p>{transaction.type}</p>
                <p>{transaction.categoryName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
