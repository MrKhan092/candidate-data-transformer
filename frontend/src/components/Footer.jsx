import React from 'react';
import { FiCpu, FiGithub, FiHeart, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-slate-800/40 bg-[#070b13]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/80 text-blue-400 ring-1 ring-slate-700/50">
              <FiCpu className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Candidate Transformer</p>
              <p className="text-[10px] text-slate-600">Multi-source AI-powered profile consolidation</p>
            </div>
          </div>

          {/* Links & Copyright */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <a
              href="https://github.com/MrKhan092"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-blue-400"
            >
              <FiGithub className="h-3.5 w-3.5" />
              <span>MrKhan092</span>
              <FiExternalLink className="h-2.5 w-2.5" />
            </a>
            <span className="h-3 w-px bg-slate-800" />
            <span className="flex items-center gap-1">
              Built with <FiHeart className="h-2.5 w-2.5 text-rose-500" /> for Eightfold AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
