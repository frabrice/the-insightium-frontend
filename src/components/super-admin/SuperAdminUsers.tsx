import React, { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit, X, Save, Search, User, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

const ROLES = ['admin', 'editor', 'author'];

interface UserForm {
  full_name: string;
  email: string;
  role: string;
  specialty: string;
  bio: string;
  twitter: string;
  linkedin: string;
  is_active: boolean;
}

const EMPTY_FORM: UserForm = {
  full_name: '',
  email: '',
  role: 'author',
  specialty: '',
  bio: '',
  twitter: '',
  linkedin: '',
  is_active: true,
};

interface CreatedCredentials {
  email: string;
  password: string;
  full_name: string;
}

export default function SuperAdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [credentials, setCredentials] = useState<CreatedCredentials | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setIsLoading(true);
    const { data } = await adminApi.superAdmin.getAllUsers();
    setUsers(data || []);
    setIsLoading(false);
  }

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setSaveMsg('');
  }

  function openEdit(user: any) {
    setEditId(user.id);
    setForm({
      full_name: user.full_name || '',
      email: user.email || '',
      role: user.role || 'author',
      specialty: user.specialty || '',
      bio: user.bio || '',
      twitter: user.twitter || '',
      linkedin: user.linkedin || '',
      is_active: user.is_active !== false,
    });
    setShowForm(true);
    setSaveMsg('');
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) return;
    setIsSaving(true);
    setSaveMsg('');

    if (editId) {
      const res = await adminApi.superAdmin.updateUser(editId, {
        full_name: form.full_name,
        role: form.role,
        specialty: form.specialty,
        bio: form.bio,
        twitter: form.twitter,
        linkedin: form.linkedin,
        is_active: form.is_active,
      });
      setIsSaving(false);
      if (res.error) {
        setSaveMsg('Failed to update: ' + ((res.error as any)?.message || ''));
      } else {
        setUsers(prev => prev.map(u => u.id === editId ? { ...u, ...form } : u));
        setSaveMsg('Updated!');
        setTimeout(() => { setSaveMsg(''); setShowForm(false); }, 1200);
      }
    } else {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const response = await fetch(`${supabaseUrl}/functions/v1/create-admin-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Apikey': supabaseAnonKey,
          },
          body: JSON.stringify(form),
        });
        const result = await response.json();
        setIsSaving(false);
        if (!response.ok || result.error) {
          setSaveMsg('Failed to create user: ' + (result.error || 'Unknown error'));
        } else {
          setUsers(prev => [result.user, ...prev]);
          setShowForm(false);
          setCredentials({ email: result.user.email, password: result.password, full_name: result.user.full_name });
        }
      } catch (err: any) {
        setIsSaving(false);
        setSaveMsg('Network error: ' + err.message);
      }
    }
  }

  async function copyToClipboard(text: string, field: string) {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchSearch = !search || u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const roleColor: Record<string, string> = {
    super_admin: 'bg-brand-red/20 text-brand-red',
    admin: 'bg-blue-900/30 text-blue-400',
    editor: 'bg-green-900/30 text-green-400',
    author: 'bg-neutral-800 text-neutral-400',
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Users</h1>
          <p className="text-neutral-500 text-sm mt-1">{users.length} total admin users</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          <Plus size={15} /> Add User
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-neutral-900 border border-neutral-800 text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600"
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
        >
          <option value="all">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
        </select>
      </div>

      {credentials && (
        <div className="bg-neutral-900 border border-green-800 rounded-sm p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-green-400 text-sm font-semibold">User created successfully</p>
              <p className="text-neutral-500 text-xs mt-0.5">Share these credentials with {credentials.full_name}. This password will not be shown again.</p>
            </div>
            <button onClick={() => setCredentials(null)} className="text-neutral-600 hover:text-neutral-400">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-neutral-800 rounded-sm px-3 py-2.5">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-sm text-white font-mono">{credentials.email}</p>
              </div>
              <button onClick={() => copyToClipboard(credentials.email, 'email')} className="text-neutral-500 hover:text-white transition-colors ml-3">
                {copiedField === 'email' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-neutral-800 rounded-sm px-3 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Password</p>
                <p className="text-sm text-white font-mono">{showPassword ? credentials.password : '•'.repeat(credentials.password.length)}</p>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button onClick={() => setShowPassword(v => !v)} className="text-neutral-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => copyToClipboard(credentials.password, 'password')} className="text-neutral-500 hover:text-white transition-colors">
                  {copiedField === 'password' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-sm w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <div>
                <h2 className="font-display font-bold text-white">{editId ? 'Edit User' : 'Add User'}</h2>
                {!editId && <p className="text-xs text-neutral-500 mt-0.5">A secure password will be generated automatically.</p>}
              </div>
              <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-neutral-300">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    disabled={!!editId}
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Specialty</label>
                  <input
                    type="text"
                    value={form.specialty}
                    onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))}
                    placeholder="e.g. Tech Journalist"
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={2}
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">Twitter Handle</label>
                  <input
                    type="text"
                    value={form.twitter}
                    onChange={e => setForm(f => ({ ...f, twitter: e.target.value }))}
                    placeholder="@handle"
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 block mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={form.is_active}
                    onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                    className="accent-brand-red"
                  />
                  <label htmlFor="is_active" className="text-sm text-neutral-300">Active account</label>
                </div>
              </div>

              {saveMsg && (
                <p className={`text-xs font-medium ${saveMsg.includes('Failed') || saveMsg.includes('error') ? 'text-red-400' : 'text-green-400'}`}>{saveMsg}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 text-sm border border-neutral-700 text-neutral-400 rounded-sm hover:border-neutral-500 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm bg-brand-red text-white rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-50">
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={13} />}
                  {editId ? 'Update' : 'Create & Generate Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-neutral-800 rounded animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-14 text-neutral-500 text-sm">No users found.</div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {filtered.map(user => (
              <div key={user.id} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-800/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 flex-shrink-0">
                  <User size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{user.full_name}</p>
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm ${roleColor[user.role] || roleColor.author}`}>
                      {user.role}
                    </span>
                    {!user.is_active && (
                      <span className="text-[10px] text-neutral-600 uppercase">inactive</span>
                    )}
                    {user.auth_id && (
                      <span className="text-[10px] text-green-600 uppercase">auth active</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                  {user.specialty && <p className="text-[10px] text-neutral-600">{user.specialty}</p>}
                </div>
                <button
                  onClick={() => openEdit(user)}
                  className="p-1.5 text-neutral-500 hover:text-brand-red transition-colors rounded"
                >
                  <Edit size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
