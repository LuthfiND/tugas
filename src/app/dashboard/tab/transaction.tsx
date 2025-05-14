import React from "react";

interface TransactionProps {
  onOpenModal: () => void;
}

const Transaction: React.FC<TransactionProps> = ({ onOpenModal }) => {
  const mockTransactions = [
    { id: "t1", amount: 100, status: "Paid" },
    { id: "t2", amount: 50, status: "Pending" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={onOpenModal}
        >
          New Transaction
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((tx) => (
            <tr key={tx.id}>
              <td className="py-2 px-4 border-b">{tx.id}</td>
              <td className="py-2 px-4 border-b">${tx.amount}</td>
              <td className="py-2 px-4 border-b">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
