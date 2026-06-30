import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward } from 'react-icons/fi';

const EducationCard = ({ education = [] }) => {
  if (!education || education.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
      className="glass-card w-full rounded-2xl p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FiBookOpen className="h-4.5 w-4.5 text-blue-500" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Education</h4>
        </div>
        <span className="rounded-lg bg-slate-800/50 px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-white/5">
          {education.length} entries
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {education.map((edu, index) => {
          const institution = edu.institution || 'Institution';
          const degree = edu.degree || 'Degree';
          const field = edu.field || '';
          const endYear = edu.end_year || 'N/A';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="flex flex-col justify-between rounded-xl bg-slate-800/15 p-4 ring-1 ring-white/5 transition-all hover:ring-blue-500/20"
            >
              <div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <FiAward className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-white leading-tight">{degree}</h5>
                    {field && <p className="mt-0.5 text-[11px] font-semibold text-blue-400">{field}</p>}
                    <p className="mt-1 text-[11px] text-slate-500">{institution}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-800/30 pt-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Graduated</span>
                <span className="text-[11px] font-bold text-slate-300">{endYear}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EducationCard;
