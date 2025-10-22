import React, { useEffect, useMemo, useState } from 'react';
import SearchFilterBar from '../components/SearchFilterBar';
import TransactionsTable from '../components/TransactionsTable';

function fetchTransactions() {
  return new Promise((res) => {
    import('../data/transactions.json').then(m => {
      setTimeout(() => res(m.default || m), 500);
    });
  });
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchTransactions()
      .then(data => { setTransactions(data); setLoading(false); })
      .catch(err => { setError(err.message || 'Failed to fetch'); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let res = transactions.filter(tx => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return tx.customerName.toLowerCase().includes(q) || tx.id.toLowerCase().includes(q);
    });
    if (status) res = res.filter(tx => tx.status === status);

    if (sortBy === 'date_desc') res.sort((a,b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === 'date_asc') res.sort((a,b) => new Date(a.date) - new Date(b.date));
    else if (sortBy === 'amount_desc') res.sort((a,b) => b.amount - a.amount);
    else if (sortBy === 'amount_asc') res.sort((a,b) => a.amount - b.amount);

    return res;
  }, [transactions, search, status, sortBy]);

  return (
    <div>
      <div className="mb-4">
        <SearchFilterBar
          search={search} setSearch={setSearch}
          status={status} setStatus={setStatus}
          sortBy={sortBy} setSortBy={setSortBy}
        />
      </div>

      {loading && <div className="p-6 text-center">Loading transactions...</div>}
      {error && <div className="p-6 text-center text-red-600">Error: {error}</div>}

      {!loading && !error && <TransactionsTable transactions={filtered} />}
    </div>
  );
}
