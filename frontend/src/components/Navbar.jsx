import React from 'react';
import { FiCpu, FiCopy, FiBook } from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Navbar = () => {

  const handleCopyApiUrl = () => {
    navigator.clipboard.writeText(API_BASE_URL);
    toast.success('API URL copied to clipboard');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/20">
            <FiCpu className="h-4 w-4" />
          </div>
          <h1 className="text-sm font-bold tracking-tight text-slate-800">
            Candidate <span className="text-teal-600">Transformer</span>
          </h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={handleCopyApiUrl}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <FiCopy className="h-3 w-3" />
            Copy API URL
          </button>
          <a
            href={`${API_BASE_URL}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700"
          >
            <FiBook className="h-3 w-3" />
            Swagger Docs
          </a>
          <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">Backend Online</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
