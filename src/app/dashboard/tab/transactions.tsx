import React from "react";

interface TransactionProps {
  onOpenModal: () => void;
}

const mockTransactions = [
  {
    id: "trx1",
    user: "Alice",
    event: "React Workshop",
    status: "pending",
    proof: "/proof1.jpg",
    qty: 2,
    total: 200000,
  },
  // ...data lain
];

const Transaction: React.FC<TransactionProps> = ({ onOpenModal }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>User</th>
          <th>Event</th>
          <th>Status</th>
          <th>Proof</th>
          <th>Qty</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {mockTransactions.map((trx) => (
          <tr key={trx.id}>
            <td>{trx.user}</td>
            <td>{trx.event}</td>
            <td>{trx.status}</td>
            <td>
              <a href={trx.proof} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </td>
            <td>{trx.qty}</td>
            <td>Rp {trx.total.toLocaleString()}</td>
            <td>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                onClick={onOpenModal}
              >
                Accept
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Transaction;
