import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatCurrency, statusColor } from '../utils/format';

export default function TransactionInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../data/transactions.json').then(m => {
      const data = m.default || m;
      const found = data.find(t => t.id === id);
      setTx(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!tx) return <div className="p-6 text-center">Transaction not found. <button onClick={() => navigate('/')} className="ml-2 text-blue-600">Back to Dashboard</button></div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
      <button onClick={() => navigate('/')} className="mb-4 text-sm text-blue-600">← Back to Dashboard</button>

      <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500">Transaction ID</div>
          <div className="font-medium">{tx.id}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Customer Name</div>
          <div className="font-medium">{tx.customerName}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Amount</div>
          <div className="font-medium">{formatCurrency(tx.amount, tx.currency)}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Currency</div>
          <div className="font-medium">{tx.currency}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Date</div>
          <div className="font-medium">{tx.date}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Status</div>
          <div className="font-medium">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor(tx.status)}`}>
              {tx.status}
            </span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="text-xs text-gray-500">Description</div>
          <div className="mt-1 text-sm text-gray-700">{tx.description}</div>
        </div>
      </div>
    </div>
  );
}
