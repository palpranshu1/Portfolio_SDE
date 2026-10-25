import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';
import MessageDetailModal from './MessageDetailModal';
import ReplyModal from './ReplyModal';
import Toast from '../components/Toast';
import {
  Inbox,
  Mail,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Reply,
  Trash2,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { admin, logout } = useAuth();

  // State
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, totalMessages: 0 });
  const [activeFilter, setActiveFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState(null);

  // Modals state
  const [viewingMessage, setViewingMessage] = useState(null);
  const [replyingMessage, setReplyingMessage] = useState(null);

  // Fetch stats & messages
  const loadData = useCallback(async (page = 1, status = activeFilter, search = searchQuery) => {
    setIsRefreshing(true);
    try {
      const [statsRes, messagesRes] = await Promise.all([
        api.getStats(),
        api.getMessages({ page, limit: 10, status, search }),
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
      }
      if (messagesRes.success) {
        setMessages(messagesRes.messages);
        setPagination(messagesRes.pagination);
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || 'Failed to fetch dashboard data.',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    loadData(1, activeFilter, searchQuery);
  }, [activeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData(1, activeFilter, searchQuery);
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      const res = await api.updateMessageStatus(messageId, newStatus);
      if (res.success) {
        setToast({ type: 'success', message: `Status updated to ${newStatus}` });
        // Update local messages array
        setMessages((prev) =>
          prev.map((m) => (m._id === messageId ? { ...m, status: newStatus } : m))
        );
        // Refresh stats
        api.getStats().then((s) => s.success && setStats(s.stats));
        // Update currently viewed message if open
        if (viewingMessage && viewingMessage._id === messageId) {
          setViewingMessage((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to update status.' });
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await api.deleteMessage(messageId);
      if (res.success) {
        setToast({ type: 'success', message: 'Message deleted successfully.' });
        loadData(pagination.page, activeFilter, searchQuery);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete message.' });
    }
  };

  const handleReplySuccess = (updatedMessage) => {
    setToast({ type: 'success', message: 'Reply dispatched successfully via email!' });
    loadData(pagination.page, activeFilter, searchQuery);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              PP
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Logged in as <span className="font-medium text-brand-600 dark:text-brand-400">{admin?.email || 'Administrator'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span>View Public Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <ThemeToggle />

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Inquiries</span>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.total}
            </div>
            <span className="text-[11px] text-slate-400">All recorded messages</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">New Messages</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {stats.new}
            </div>
            <span className="text-[11px] text-slate-400">Awaiting review</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Read Messages</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {stats.read}
            </div>
            <span className="text-[11px] text-slate-400">Reviewed inquiries</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">Replied Messages</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
              {stats.replied}
            </div>
            <span className="text-[11px] text-slate-400">Responses delivered</span>
          </div>
        </div>

        {/* Message Controls (Search, Filters, Refresh) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
              {[
                { label: 'All', value: '' },
                { label: 'New', value: 'new' },
                { label: 'Read', value: 'read' },
                { label: 'Replied', value: 'replied' },
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeFilter === tab.value
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input & Refresh */}
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search sender, email, subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </form>

              <button
                onClick={() => loadData(pagination.page, activeFilter, searchQuery)}
                disabled={isRefreshing}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Refresh messages"
              >
                <RefreshCw className={`w-4 h-4 text-slate-600 dark:text-slate-300 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Table Container */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
              <p className="text-sm">Loading message inquiries...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Messages Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {searchQuery || activeFilter
                  ? 'No messages matched your filter criteria. Try clearing your search query.'
                  : 'Your portfolio inbox is currently empty. Any messages submitted through the contact form will appear here in real time.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-3.5">Sender</th>
                    <th className="px-6 py-3.5">Subject</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 text-xs">
                  {messages.map((msg) => (
                    <tr
                      key={msg._id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                      onClick={() => setViewingMessage(msg)}
                    >
                      {/* Sender */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {msg.name}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {msg.email}
                        </div>
                      </td>

                      {/* Subject & Preview */}
                      <td className="px-6 py-4 max-w-md">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {msg.subject}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 truncate text-[11px]">
                          {msg.message}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                        {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={msg.status}
                          onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingMessage(msg)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="View Message Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setReplyingMessage(msg)}
                            className="p-1.5 rounded-lg text-brand-600 dark:text-brand-400 hover:bg-brand-500/10 transition-colors"
                            title="Reply via Email"
                          >
                            <Reply className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete message from ${msg.name}?`)) {
                                handleDeleteMessage(msg._id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Bar */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Page {pagination.page} of {pagination.totalPages} ({pagination.totalMessages} total messages)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={!pagination.hasPrevPage}
                  onClick={() => loadData(pagination.page - 1, activeFilter, searchQuery)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={!pagination.hasNextPage}
                  onClick={() => loadData(pagination.page + 1, activeFilter, searchQuery)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Modals */}
      <MessageDetailModal
        message={viewingMessage}
        isOpen={!!viewingMessage}
        onClose={() => setViewingMessage(null)}
        onStatusChange={handleStatusChange}
        onOpenReply={(msg) => setReplyingMessage(msg)}
        onDelete={handleDeleteMessage}
      />

      <ReplyModal
        message={replyingMessage}
        isOpen={!!replyingMessage}
        onClose={() => setReplyingMessage(null)}
        onReplySuccess={handleReplySuccess}
      />

      {/* Global Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
