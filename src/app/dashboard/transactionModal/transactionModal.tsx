import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  // Tambahkan logic untuk accept/reject, kirim email, restore seat, return voucher/coupon/point
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Transaction Action</h2>
        <p>Send notification email to customer?</p>
        <div className="flex gap-4 mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Reject
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
