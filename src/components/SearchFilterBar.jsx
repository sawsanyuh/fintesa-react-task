

export default function SearchFilterBar({ search, setSearch, status, setStatus, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:gap-4 mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name or ID"
        className="flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded">
        <option value="">All Statuses</option>
        <option>Pending</option>
        <option>Completed</option>
        <option>Failed</option>
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded">
        <option value="">Sort (none)</option>
        <option value="date_desc">Date (newest)</option>
        <option value="date_asc">Date (oldest)</option>
      </select>
    </div>
  );
}
