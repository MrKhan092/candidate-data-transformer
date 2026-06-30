import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiGlobe, FiLink, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';

const LinksCard = ({ links = {} }) => {
  const { github, linkedin, portfolio, other = [] } = links;
  const hasLinks = github || linkedin || portfolio || (other && other.length > 0);
  if (!hasLinks) return null;

  const ensureHttp = (url) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) return `https://${cleanUrl}`;
    return cleanUrl;
  };

  const linkItems = [
    {
      name: 'GitHub',
      subtitle: 'Code & Repositories',
      url: github,
      icon: FiGithub,
      gradient: 'from-slate-700 to-slate-800',
      hover: 'hover:ring-slate-500',
      iconBg: 'bg-white/15 text-white',
    },
    {
      name: 'LinkedIn',
      subtitle: 'Professional Network',
      url: linkedin,
      icon: FiLinkedin,
      gradient: 'from-blue-600 to-blue-700',
      hover: 'hover:ring-blue-400',
      iconBg: 'bg-white/15 text-white',
    },
    {
      name: 'Portfolio',
      subtitle: 'Personal Website',
      url: portfolio,
      icon: FiGlobe,
      gradient: 'from-violet-600 to-purple-700',
      hover: 'hover:ring-violet-400',
      iconBg: 'bg-white/15 text-white',
    },
  ].filter(item => item.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="glass-panel w-full rounded-2xl p-6"
    >
      <div className="mb-5 flex items-center gap-2.5">
        <FiLink className="h-4.5 w-4.5 text-teal-500" />
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">External Profiles</h4>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {linkItems.map((item, index) => (
          <motion.a
            key={index}
            href={ensureHttp(item.url)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} p-4 ring-1 ring-white/10 shadow-md transition-all ${item.hover}`}
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white">{item.name}</p>
              <p className="text-[10px] text-white/50">{item.subtitle}</p>
            </div>
            <FiArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        ))}
      </div>

      {other && other.length > 0 && (
        <div className="mt-4 border-t border-slate-200 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Other links</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {other.map((link, idx) => (
              <a
                key={idx}
                href={ensureHttp(link)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-500 transition-colors hover:text-teal-600 hover:border-teal-300"
              >
                <FiExternalLink className="h-2.5 w-2.5" />
                <span className="max-w-[140px] truncate">{link}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LinksCard;
