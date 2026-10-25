import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-600">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The page you are looking for doesn't exist or has been relocated.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
