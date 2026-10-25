import React, { useState } from 'react';
import { X, Send, Mail, Loader2, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export default function ReplyModal({ message, isOpen, onClose, onReplySuccess }) {
  const [replySubject, setReplySubject] = useState(
    message ? (message.subject.startsWith('Re:') ? message.subject : `Re: ${message.subject}`) : ''
  );
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !message) return null;

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      setError('Reply message cannot be empty.');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const result = await api.replyToMessage(message._id, {
        replySubject,
        replyMessage: replyMessage.trim(),
      });

      if (onReplySuccess) {
        onReplySuccess(result.data || message);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to send reply email via SMTP server.');
    } finally {
      setIsSending(false);
    }
  };

  // Generate fallback mailto link
  const mailtoUrl = `mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(
    replySubject
  )}&body=${encodeURIComponent(
    `Hi ${message.name},\n\n\n\n---\nOriginal Message:\n${message.message}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Reply to Message
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                To: <span className="font-semibold text-slate-700 dark:text-slate-200">{message.name}</span> &lt;{message.email}&gt;
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSendReply} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Reply Content
            </label>
            <textarea
              rows="6"
              required
              placeholder="Hi there, thanks for reaching out..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-y"
            />
          </div>

          {/* Original message reference */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold block mb-1">Original Inquiry:</span>
            <p className="line-clamp-2 italic">"{message.message}"</p>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
            <a
              href={mailtoUrl}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Or open in default mail app (mailto:)</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-60"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
