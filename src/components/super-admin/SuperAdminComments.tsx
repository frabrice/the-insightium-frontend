import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, Search } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

export default function SuperAdminComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, [filter]);

  async function loadComments() {
    setIsLoading(true);
    const { data } = await adminApi.analytics.getComments(filter === 'all' ? undefined : filter);
    setComments(data || []);
    setIsLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await adminApi.analytics.updateCommentStatus(id, status);
    setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setUpdating(null);
  }

  const filtered = comments.filter(c =>
    !search ||
    c.content?.toLowerCase().includes(search.toLowerCase()) ||
    c.reader_name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const cfg: Record<string, string> = {
      approved: 'bg-green-900/30 text-green-400',
      pending: 'bg-yellow-900/30 text-yellow-400',
      rejected: 'bg-red-900/30 text-red-400',
    };
    return (
      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm ${cfg[status] || cfg.pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-white text-2xl">Comment Moderation</h1>
        <p className="text-neutral-500 text-sm mt-1">Review and moderate reader comments</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search comments..."
            className="w-full bg-neutral-900 border border-neutral-800 text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600"
          />
        </div>
        <div className="flex gap-1 bg-neutral-900 border border-neutral-800 rounded-sm p-1">
          {['pending', 'approved', 'rejected', 'all'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors capitalize ${
                filter === f ? 'bg-brand-red text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-neutral-800 rounded animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-14">
            <MessageSquare size={32} className="mx-auto mb-3 text-neutral-700" />
            <p className="text-neutral-500 text-sm">No {filter === 'all' ? '' : filter} comments.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {filtered.map(comment => (
              <div key={comment.id} className="p-4 hover:bg-neutral-800/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-medium text-white">{comment.reader_name || 'Anonymous'}</span>
                      {statusBadge(comment.status)}
                      <span className="text-[10px] text-neutral-600">
                        {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">{comment.content}</p>
                    {comment.articles?.title && (
                      <p className="text-[10px] text-neutral-600 mt-1.5">On: {comment.articles.title}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {comment.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(comment.id, 'approved')}
                        disabled={updating === comment.id}
                        title="Approve"
                        className="p-1.5 text-neutral-500 hover:text-green-400 transition-colors rounded disabled:opacity-40"
                      >
                        <CheckCircle size={15} />
                      </button>
                    )}
                    {comment.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(comment.id, 'rejected')}
                        disabled={updating === comment.id}
                        title="Reject"
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors rounded disabled:opacity-40"
                      >
                        <XCircle size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
