import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiAward, FiShield, FiCheckCircle } from 'react-icons/fi';

const CandidateCard = ({ profile }) => {
  const name = profile.full_name || profile.candidate_name || 'Anonymous Candidate';
  const email = profile.primary_email || profile.email || 'No email provided';
  const phone = profile.phone || 'No phone provided';
  const confidence = profile.overall_confidence ? Math.round(profile.overall_confidence * 100) : 0;

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getConfidenceInfo = (score) => {
    if (score >= 90) return { label: 'High Confidence', gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-200' };
    if (score >= 70) return { label: 'Medium Confidence', gradient: 'from-teal-500 to-cyan-500', text: 'text-teal-600', bg: 'bg-teal-50', ring: 'ring-teal-200' };
    return { label: 'Low Confidence', gradient: 'from-amber-500 to-orange-500', text: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-200' };
  };

  const conf = getConfidenceInfo(confidence);

  // Profile completeness
  const fields = [profile.full_name || profile.candidate_name, profile.primary_email || profile.email, profile.phone, profile.skills?.length, profile.experience?.length, profile.education?.length, profile.links];
  const completeness = Math.round((fields.filter(Boolean).length / fields.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-panel w-full rounded-2xl p-6"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="relative mx-auto sm:mx-0">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 text-2xl font-black text-white shadow-lg shadow-teal-500/20 ring-2 ring-teal-400/30">
            {initials || <FiUser />}
          </div>
          {/* Verified badge */}
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30 ring-2 ring-white">
            <FiCheckCircle className="h-3.5 w-3.5 text-white" />
          </div>
        </div>

        {/* Profile info */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-800">{name}</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-inset ring-emerald-200">
              <FiShield className="h-2.5 w-2.5" /> Verified
            </span>
          </div>

          <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              <FiMail className="h-3.5 w-3.5 text-teal-500" />
              <span className="truncate max-w-[200px]">{email}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              <FiPhone className="h-3.5 w-3.5 text-teal-500" />
              <span>{phone}</span>
            </div>
          </div>

          {/* Profile completeness bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              <span>Profile Completeness</span>
              <span className="text-slate-500">{completeness}%</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completeness}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Confidence badge */}
        {confidence > 0 && (
          <div className={`flex flex-col items-center rounded-2xl ${conf.bg} p-4 ring-1 ${conf.ring} text-center shrink-0 w-full sm:w-auto min-w-[130px]`}>
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <FiAward className={`h-3 w-3 ${conf.text}`} />
              <span>Confidence</span>
            </div>
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
              className={`mt-2 text-3xl font-black ${conf.text}`}
            >
              {confidence}%
            </motion.span>
            <span className={`mt-1 text-[10px] font-bold ${conf.text}`}>{conf.label}</span>
            <div className="mt-3 h-1 w-24 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${conf.gradient}`}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CandidateCard;
