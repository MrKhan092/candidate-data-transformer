import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

const ExperienceCard = ({ experience = [] }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="glass-card w-full rounded-2xl p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FiBriefcase className="h-4.5 w-4.5 text-blue-500" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Professional Experience</h4>
        </div>
        <span className="rounded-lg bg-slate-800/50 px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-white/5">
          {experience.length} roles
        </span>
      </div>

      <div className="relative ml-3 border-l border-slate-800 pl-6 space-y-6">
        {experience.map((exp, index) => {
          const company = exp.company || 'Company';
          const title = exp.title || 'Role';
          const start = exp.start || 'N/A';
          const end = exp.end || 'Present';
          const summary = exp.summary || '';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[29px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-blue-500 bg-[#0b0f19]" />

              <div className="rounded-xl bg-slate-800/15 p-4 ring-1 ring-white/5 transition-all hover:ring-blue-500/20">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white">{title}</h5>
                    <p className="text-xs font-medium text-slate-400">{company}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 rounded-md bg-blue-500/8 px-2 py-0.5 text-[10px] font-semibold text-blue-400 ring-1 ring-blue-500/15 mt-1 sm:mt-0">
                    <FiCalendar className="h-2.5 w-2.5" />
                    <span>{start} — {end}</span>
                  </div>
                </div>
                {summary && (
                  <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                    {summary}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
