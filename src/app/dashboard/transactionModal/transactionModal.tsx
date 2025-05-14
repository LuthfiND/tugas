import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-xl font-semibold mb-4">New Transaction</h3>
        <form>
          <label className="block mb-2">
            Amount
            <input type="number" className="w-full mt-1 p-2 border rounded" />
          </label>
          <label className="block mb-4">
            Status
            <select className="w-full mt-1 p-2 border rounded">
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
