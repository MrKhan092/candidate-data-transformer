import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiLoader } from 'react-icons/fi';

const pipelineSteps = [
  { label: 'Uploading Resume', duration: 800 },
  { label: 'Extracting PDF Text', duration: 1200 },
  { label: 'Parsing Resume via Gemini', duration: 6000 },
  { label: 'Reading Recruiter CSV', duration: 1000 },
  { label: 'Fetching GitHub Profile', duration: 2000 },
  { label: 'Normalizing Candidate Data', duration: 1500 },
  { label: 'Merging Source Profiles', duration: 1200 },
  { label: 'Computing Confidence Scores', duration: 800 },
  { label: 'Building Canonical Profile', duration: 1000 },
  { label: 'Generating JSON Projection', duration: 800 },
];

const Loading = () => {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    let timeout;
    const advanceStep = (step) => {
      if (step >= pipelineSteps.length) return;
      timeout = setTimeout(() => {
        setCompletedSteps(step + 1);
        advanceStep(step + 1);
      }, pipelineSteps[step].duration);
    };
    advanceStep(0);
    return () => clearTimeout(timeout);
  }, []);

  const progress = Math.min((completedSteps / pipelineSteps.length) * 100, 95);

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="text-lg font-bold tracking-tight text-slate-800">
          AI Processing Pipeline
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Transforming multi-source data into a unified candidate profile
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 w-full max-w-sm">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
          />
        </div>
        <p className="mt-2 text-center text-[11px] font-medium text-slate-400">
          {completedSteps} of {pipelineSteps.length} steps completed
        </p>
      </div>

      {/* Pipeline Steps */}
      <div className="w-full max-w-sm space-y-1">
        {pipelineSteps.map((step, index) => {
          const isCompleted = index < completedSteps;
          const isActive = index === completedSteps && completedSteps < pipelineSteps.length;
          const isPending = index > completedSteps;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04, duration: 0.2 }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive ? 'bg-teal-50/70' : ''
              }`}
            >
              {/* Status icon */}
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs transition-all ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-600'
                  : isActive
                  ? 'bg-teal-50 text-teal-600'
                  : 'bg-slate-50 text-slate-400'
              }`}>
                {isCompleted ? (
                  <FiCheck className="h-3.5 w-3.5" />
                ) : isActive ? (
                  <FiLoader className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span className="text-[10px] font-bold">{index + 1}</span>
                )}
              </div>

              {/* Step label */}
              <span className={`text-xs font-medium transition-colors ${
                isCompleted ? 'text-slate-600' : isActive ? 'text-teal-700' : 'text-slate-400'
              }`}>
                {step.label}
              </span>

              {/* Completed checkmark text */}
              {isCompleted && (
                <span className="ml-auto text-[10px] font-medium text-emerald-500">Done</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
