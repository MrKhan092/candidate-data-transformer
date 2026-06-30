import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiFileText, FiDatabase, FiGithub, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProvenanceCard = ({ provenance = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!provenance || provenance.length === 0) return null;

  const getSourceDetails = (source = '') => {
    const s = source.toLowerCase();
    if (s.includes('csv') || s.includes('recruiter')) {
      return {
        label: 'CSV',
        icon: FiDatabase,
        dot: 'bg-emerald-500',
        badge: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
      };
    }
    if (s.includes('github')) {
      return {
        label: 'GitHub',
        icon: FiGithub,
        dot: 'bg-purple-500',
        badge: 'bg-purple-500/10 text-purple-400 ring-purple-500/20',
      };
    }
    return {
      label: 'Resume',
      icon: FiFileText,
      dot: 'bg-blue-500',
      badge: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    };
  };

  // Count by source
  const sourceCounts = provenance.reduce((acc, item) => {
    const src = getSourceDetails(item.source);
    acc[src.label] = (acc[src.label] || 0) + 1;
    return acc;
  }, {});

  const displayedItems = isExpanded ? provenance : provenance.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 }}
      className="glass-card w-full overflow-hidden rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/40 p-5">
        <div className="flex items-center gap-2.5">
          <FiShield className="h-4.5 w-4.5 text-blue-500" />
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Data Provenance</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Field-level source audit trail</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {Object.entries(sourceCounts).map(([label, count]) => (
            <span key={label} className="flex items-center gap-1.5 rounded-md bg-slate-800/40 px-2 py-1 text-[10px] font-bold text-slate-400">
              <span className={`h-1.5 w-1.5 rounded-full ${getSourceDetails(label.toLowerCase()).dot}`} />
              {count} {label}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800/30 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-5">Field</th>
              <th className="py-3 px-5">Value</th>
              <th className="py-3 px-5">Source</th>
              <th className="py-3 px-5">Method</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {displayedItems.map((item, index) => {
                const src = getSourceDetails(item.source);
                const SrcIcon = src.icon;
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-slate-800/15 transition-colors hover:bg-slate-800/10"
                  >
                    <td className="py-3 px-5">
                      <span className="font-semibold text-slate-300 capitalize">
                        {item.field.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-5 max-w-[200px]">
                      <span className="truncate block text-slate-400 font-medium" title={item.value}>
                        {item.value}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 ${src.badge}`}>
                        <SrcIcon className="h-2.5 w-2.5" />
                        {src.label}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <code className="rounded bg-slate-800/40 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                        {item.method || 'parser'}
                      </code>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Expand/Collapse */}
      {provenance.length > 6 && (
        <div className="border-t border-slate-800/30 p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-semibold text-slate-400 transition-colors hover:text-blue-400 focus:outline-none"
          >
            {isExpanded ? (
              <>
                <FiChevronUp className="h-3.5 w-3.5" />
                Show less
              </>
            ) : (
              <>
                <FiChevronDown className="h-3.5 w-3.5" />
                Show all {provenance.length} fields
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProvenanceCard;
