'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import {
  Users,
  Search,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Trash2,
  Lock,
  Crown,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New user form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    department: '',
  });

  // Fetch users dynamically from Render Cloud DB API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      toast.error('Failed to load users from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      (u.title && u.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Name, email, and password are required');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      toast.success(`User ${data.user.name} added to Render PostgreSQL!`);
      setForm({ name: '', email: '', password: '', title: '', department: '' });
      setIsAddModalOpen(false);
      fetchUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating user';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (id === 'usr-admin-1') {
      toast.error('Cannot delete the sole Administrator / Platform Creator (Aadithyan A.S.)');
      return;
    }

    if (!confirm(`Are you sure you want to delete user "${name}" from the database?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');

      toast.success(`User ${name} deleted successfully`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error deleting user';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            Cloud Database Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Registered Users & Access Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Aadithyan A.S. is the <strong className="text-amber-300">sole Administrator & Creator</strong> who publishes videos. All other accounts are registered viewers and clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            disabled={loading}
            title="Refresh database records"
            className="p-2 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Add New User
          </button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
        <div className="text-xs text-zinc-400 font-mono">
          Showing <span className="text-amber-400 font-semibold">{filtered.length}</span> of {users.length} Database Users
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/60 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Affiliation / Title</th>
                <th className="py-3 px-4">System Role</th>
                <th className="py-3 px-4">Member Since</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((u) => {
                const isAdmin = u.role === 'ADMIN' || u.email === 'aadithyan@creatorstudio.dev';
                return (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.image ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                          }
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                            {u.name}
                            {isAdmin && (
                              <span title="Sole Creator & Admin">
                                <Crown className="w-3.5 h-3.5 text-amber-400" />
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-zinc-400 text-xs">
                      <div className="text-zinc-300 font-medium">{u.title || 'Viewer & Client'}</div>
                      <div className="text-[10px] text-zinc-500">{u.department || 'External Reviewer'}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isAdmin
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {isAdmin ? <ShieldCheck className="w-3 h-3" /> : null}
                        {isAdmin ? 'SOLE ADMIN & CREATOR' : 'USER (VIEWER)'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isAdmin ? (
                        <span className="text-[10px] font-mono text-amber-400/80 px-2 py-1 rounded bg-amber-500/5 border border-amber-500/20">
                          Protected Owner
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          title="Delete user"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-0">
          <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-white/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Add New Dynamic User</h3>
                  <p className="text-[11px] text-zinc-400">Saves directly to Render Cloud PostgreSQL</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Architecture Notice */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Single Creator Rule:</strong> Aadithyan A.S. is the sole Creator & Admin. All new accounts are created with role <span className="font-mono font-bold text-white">USER</span> to view and submit requests.
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Maya Sunder"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. maya@agency.com"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Password * (min 6 characters)</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create user login password"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Title / Affiliation</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Media Agency Lead"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Department / Org</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="e.g. Commercial Review"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  {isSubmitting ? 'Saving to Database...' : 'Save User to Cloud DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
