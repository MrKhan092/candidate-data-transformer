import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiGithub, FiTrash2, FiCpu, FiRefreshCw, FiDatabase } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FileUploadZone = ({ label, stepNumber, file, setFile, dragging, setDragging, inputRef, accept, acceptLabel, icon: Icon, loading }) => {
  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); setDragging(false); };
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-400">{stepNumber}</span>
        {label}
      </label>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !loading && inputRef.current?.click()}
        className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed px-5 py-4 transition-all duration-200 ${
          loading ? 'pointer-events-none opacity-50' :
          dragging ? 'border-blue-500 bg-blue-500/10' :
          file ? 'border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/8' :
          'border-slate-800 bg-[#0f172a]/40 hover:border-slate-700 hover:bg-[#0f172a]/80'
        }`}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => setFile(e.target.files[0])}
          accept={accept}
          className="hidden"
          disabled={loading}
        />

        {/* Icon */}
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
          file ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800/60 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-400'
        }`}>
          {file ? <FiCheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="truncate text-sm font-semibold text-slate-200">{file.name}</p>
              <p className="mt-0.5 text-[11px] text-emerald-400 font-medium">✓ File uploaded — click or drag to replace</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-300">
                Drag & drop or <span className="text-blue-400 group-hover:underline">browse</span>
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{acceptLabel}</p>
            </>
          )}
        </div>

        {/* Delete action */}
        {file && !loading && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setFile(null); }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
            aria-label="Remove file"
          >
            <FiTrash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

const UploadForm = ({ onSubmit, loading }) => {
  const [resume, setResume] = useState(null);
  const [csv, setCsv] = useState(null);
  const [githubUsername, setGithubUsername] = useState('');

  const [resumeDragging, setResumeDragging] = useState(false);
  const [csvDragging, setCsvDragging] = useState(false);

  const resumeInputRef = useRef(null);
  const csvInputRef = useRef(null);

  const handleResumeChange = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Resume must be a PDF file.');
      return;
    }
    setResume(file);
    toast.success(`Resume uploaded: ${file.name}`);
  };

  const handleCsvChange = (file) => {
    if (!file) return;
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Recruiter file must be a CSV file.');
      return;
    }
    setCsv(file);
    toast.success(`CSV uploaded: ${file.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) { toast.error('Please upload a resume PDF.'); return; }
    if (!csv) { toast.error('Please upload a recruiter CSV.'); return; }
    if (!githubUsername.trim()) { toast.error('Please enter a GitHub username.'); return; }
    onSubmit(resume, csv, githubUsername.trim());
  };

  const readinessCount = [resume, csv, githubUsername.trim()].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel w-full rounded-2xl p-6 sm:p-7"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <FiUploadCloud className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-white">Upload Sources</h2>
            <p className="text-[11px] text-slate-500">Provide candidate data from 3 sources</p>
          </div>
        </div>
        <span className="rounded-lg bg-slate-800/50 px-2 py-1 text-[10px] font-bold text-slate-400 ring-1 ring-white/5">
          {readinessCount}/3
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FileUploadZone
          label="Resume PDF"
          stepNumber="1"
          file={resume}
          setFile={handleResumeChange}
          dragging={resumeDragging}
          setDragging={setResumeDragging}
          inputRef={resumeInputRef}
          accept=".pdf,application/pdf"
          acceptLabel="PDF format only · Max 10MB"
          icon={FiFileText}
          loading={loading}
        />

        <FileUploadZone
          label="Recruiter CSV"
          stepNumber="2"
          file={csv}
          setFile={handleCsvChange}
          dragging={csvDragging}
          setDragging={setCsvDragging}
          inputRef={csvInputRef}
          accept=".csv,text/csv"
          acceptLabel="CSV format only · Comma separated"
          icon={FiDatabase}
          loading={loading}
        />

        {/* GitHub Username */}
        <div>
          <label htmlFor="github-username" className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-400">3</span>
            GitHub Username
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <FiGithub className="h-4.5 w-4.5 text-slate-500" />
            </div>
            <input
              type="text"
              id="github-username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g. MrKhan092"
              disabled={loading}
              className="block w-full rounded-2xl border border-slate-800 bg-[#0f172a]/40 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-200 placeholder-slate-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              aria-label="GitHub username"
            />
            {githubUsername.trim() && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <FiCheckCircle className="h-4 w-4 text-emerald-400" />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/15 transition-all hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0b0f19] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Transform candidate data"
        >
          {loading ? (
            <>
              <FiRefreshCw className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FiCpu className="h-4 w-4" />
              <span>Transform Candidate Profile</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UploadForm;
