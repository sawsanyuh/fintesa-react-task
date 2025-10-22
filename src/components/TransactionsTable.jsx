import React from 'react';
import { formatCurrency, statusColor } from '../utils/format';
import { useNavigate } from 'react-router-dom';

export default function TransactionsTable({ transactions }) {
  const navigate = useNavigate();

  if (!transactions.length) {
    return <div className="p-6 text-center text-gray-500">No transactions found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Transaction ID</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Customer Name</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Amount</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Date</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {transactions.map(tx => (
            <tr key={tx.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/transaction/${encodeURIComponent(tx.id)}`)}>
              <td className="px-4 py-3 text-sm font-medium">{tx.id}</td>
              <td className="px-4 py-3 text-sm">{tx.customerName}</td>
              <td className="px-4 py-3 text-sm">{formatCurrency(tx.amount, tx.currency)}</td>
              <td className="px-4 py-3 text-sm">{tx.date}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor(tx.status)}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
