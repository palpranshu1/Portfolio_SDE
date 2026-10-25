import React from 'react';
import { X, Mail, Calendar, Globe, Reply, Trash2, CheckCircle, Clock } from 'lucide-react';

export default function MessageDetailModal({
  message,
  isOpen,
  onClose,
  onStatusChange,
  onOpenReply,
  onDelete,
}) {
  if (!isOpen || !message) return null;

  const formattedDate = new Date(message.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const statusColors = {
    new: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    read: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    replied: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border ${statusColors[message.status]}`}>
                {message.status}
              </span>
              {message.emailNotificationSent && (
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Notified via Email
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {message.subject}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sender metadata table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block font-semibold mb-0.5">Sender:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{message.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold mb-0.5">Email Address:</span>
            <a href={`mailto:${message.email}`} className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
              {message.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Received: {formattedDate}</span>
          </div>
          {message.ipAddress && (
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <span>IP: {message.ipAddress}</span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message Body</h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            {message.message}
          </div>
        </div>

        {/* Reply history if already replied */}
        {message.replyDetails?.replyMessage && (
          <div className="mb-6 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs">
            <div className="flex items-center justify-between mb-2 text-purple-600 dark:text-purple-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Reply className="w-3.5 h-3.5" />
                Reply Sent
              </span>
              <span>{new Date(message.replyDetails.sentAt).toLocaleString()}</span>
            </div>
            <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
              {message.replyDetails.replyMessage}
            </p>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Status changer buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Mark:</span>
            {['new', 'read', 'replied'].map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(message._id, st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize border transition-colors ${
                  message.status === st
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenReply(message);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete the message from ${message.name}?`)) {
                  onDelete(message._id);
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-500/10 text-xs font-semibold border border-rose-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
