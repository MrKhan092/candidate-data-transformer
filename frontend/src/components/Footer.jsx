import React from 'react';
import { FiCpu, FiGithub, FiHeart, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-teal-600 ring-1 ring-slate-200">
              <FiCpu className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-600">Candidate Transformer</p>
              <p className="text-[10px] text-slate-400">Multi-source AI-powered profile consolidation</p>
            </div>
          </div>

          {/* Links & Copyright */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <a
              href="https://github.com/MrKhan092"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-teal-600"
            >
              <FiGithub className="h-3.5 w-3.5" />
              <span>MrKhan092</span>
              <FiExternalLink className="h-2.5 w-2.5" />
            </a>
            <span className="h-3 w-px bg-slate-200" />
            <span className="flex items-center gap-1">
              Built with <FiHeart className="h-2.5 w-2.5 text-rose-400" /> for Eightfold AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
