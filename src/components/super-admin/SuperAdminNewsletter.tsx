import React, { useEffect, useState } from 'react';
import { Mail, Download, Search } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

export default function SuperAdminNewsletter() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminApi.superAdmin.getSubscribers().then(({ data }) => {
      setSubscribers(data || []);
      setIsLoading(false);
    });
  }, []);

  const filtered = subscribers.filter(s =>
    !search || s.email?.toLowerCase().includes(search.toLowerCase())
  );

  function exportCSV() {
    const csv = ['Email,Subscribed At', ...filtered.map(s => `${s.email},${s.subscribed_at || s.created_at}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Newsletter</h1>
          <p className="text-neutral-500 text-sm mt-1">{subscribers.length} total subscribers</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white px-4 py-2.5 text-sm font-medium rounded-sm transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
          <p className="text-xs text-neutral-500 mb-1">Total Subscribers</p>
          <p className="text-2xl font-bold text-white">{subscribers.length}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
          <p className="text-xs text-neutral-500 mb-1">This Month</p>
          <p className="text-2xl font-bold text-white">
            {subscribers.filter(s => {
              const date = new Date(s.subscribed_at || s.created_at);
              const now = new Date();
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
          <p className="text-xs text-neutral-500 mb-1">This Week</p>
          <p className="text-2xl font-bold text-white">
            {subscribers.filter(s => {
              const date = new Date(s.subscribed_at || s.created_at);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return date > weekAgo;
            }).length}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search subscribers..."
            className="w-full bg-neutral-900 border border-neutral-800 text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600"
          />
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-2">
            {[...Array(6)].map((_, i) => <div key={i} className="h-10 bg-neutral-800 rounded animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-14">
            <Mail size={32} className="mx-auto mb-3 text-neutral-700" />
            <p className="text-neutral-500 text-sm">No subscribers yet.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-800 border-b border-neutral-700">
              <tr>
                <th className="text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Email</th>
                <th className="text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filtered.map((sub, i) => (
                <tr key={sub.id || i} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm text-neutral-300">{sub.email}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-neutral-600">
                      {new Date(sub.subscribed_at || sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
