import React from 'react';
import { FiCpu, FiActivity } from 'react-icons/fi';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#0b0f19]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/15">
            <FiCpu className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white">
              Candidate<span className="text-blue-400">Transformer</span>
            </h1>
            <span className="hidden rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-blue-400 ring-1 ring-inset ring-blue-400/20 sm:inline-block">
              v1.0
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
            <FiActivity className="h-3 w-3" />
            <span className="hidden sm:inline">Pipeline Ready</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
