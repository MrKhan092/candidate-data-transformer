import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiGithub, FiTrash2, FiCpu, FiRefreshCw, FiDatabase, FiBox, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import OutputConfig from './OutputConfig';

const SAMPLE_GITHUB_USERNAME = 'MrKhan092';

const DEFAULT_OUTPUT_CONFIG = {
  fields: [
    { path: "full_name" },
    { path: "primary_email", from: "emails[0]" },
    { path: "phone", from: "phones[0]" },
    { path: "skills", from: "skills[].name" },
    { path: "experience" },
    { path: "education" },
    { path: "links" }
  ],
  include_confidence: true,
  include_provenance: true,
  on_missing: "null"
};

const FileUploadZone = ({ label, stepNumber, file, setFile, onClear, dragging, setDragging, inputRef, accept, acceptLabel, icon: Icon, loading, onUseSample, sampleLabel }) => {
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
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-50 text-[10px] font-bold text-teal-600">{stepNumber}</span>
        {label}
      </label>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !loading && inputRef.current?.click()}
        className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed px-5 py-4 transition-all duration-200 ${
          loading ? 'pointer-events-none opacity-50' :
          dragging ? 'border-teal-400 bg-teal-50/50' :
          file ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50' :
          'border-slate-200 bg-slate-50/40 hover:border-slate-300 hover:bg-slate-50'
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
          file ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600'
        }`}>
          {file ? <FiCheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="truncate text-sm font-semibold text-slate-700">{file.name}</p>
              <p className="mt-0.5 text-[11px] text-emerald-600 font-medium">✓ File uploaded — click or drag to replace</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-600">
                Drag & drop or <span className="text-teal-600 group-hover:underline">browse</span>
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">{acceptLabel}</p>
            </>
          )}
        </div>

        {/* Delete action */}
        {file && !loading && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 focus:outline-none cursor-pointer"
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
  const [outputConfig, setOutputConfig] = useState(DEFAULT_OUTPUT_CONFIG);

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

  // Fetch sample file from public/samples and create a File object
  const fetchSampleFile = async (url, filename, mimeType) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch sample file');
      const blob = await response.blob();
      return new File([blob], filename, { type: mimeType });
    } catch (err) {
      toast.error('Could not load sample file.');
      return null;
    }
  };

  const handleUseSampleResume = async () => {
    const file = await fetchSampleFile('/samples/sample_resume.pdf', 'sample_resume.pdf', 'application/pdf');
    if (file) {
      setResume(file);
      toast.success('Sample resume loaded');
    }
  };

  const handleUseSampleCsv = async () => {
    const file = await fetchSampleFile('/samples/sample_recruiter.csv', 'sample_recruiter.csv', 'text/csv');
    if (file) {
      setCsv(file);
      toast.success('Sample CSV loaded');
    }
  };

  const handleUseSampleGithub = () => {
    setGithubUsername(SAMPLE_GITHUB_USERNAME);
    toast.success(`Sample username set: ${SAMPLE_GITHUB_USERNAME}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) { toast.error('Please upload a resume PDF.'); return; }
    if (!csv) { toast.error('Please upload a recruiter CSV.'); return; }
    if (!githubUsername.trim()) { toast.error('Please enter a GitHub username.'); return; }
    onSubmit(resume, csv, githubUsername.trim(), outputConfig);
  };

  const readinessCount = [resume, csv, githubUsername.trim()].filter(Boolean).length;

  // Load all samples at once
  const handleLoadAllSamples = async () => {
    const toastId = toast.loading('Loading sample data...');
    const [resumeFile, csvFile] = await Promise.all([
      fetchSampleFile('/samples/sample_resume.pdf', 'sample_resume.pdf', 'application/pdf'),
      fetchSampleFile('/samples/sample_recruiter.csv', 'sample_recruiter.csv', 'text/csv'),
    ]);
    if (resumeFile) setResume(resumeFile);
    if (csvFile) setCsv(csvFile);
    setGithubUsername(SAMPLE_GITHUB_USERNAME);
    toast.success('All sample data loaded!', { id: toastId });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel w-full rounded-2xl p-6 sm:p-7"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <FiUploadCloud className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-800">Upload Sources</h2>
              <p className="text-[11px] text-slate-400">Provide candidate data from 3 sources</p>
            </div>
          </div>
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
            {readinessCount}/3
          </span>
        </div>

        {/* Quick Load All Samples */}
        {readinessCount === 0 && !loading && (
          <button
            type="button"
            onClick={handleLoadAllSamples}
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-2.5 text-xs font-semibold text-white shadow-md shadow-teal-500/20 transition-all hover:shadow-lg hover:shadow-teal-500/30 cursor-pointer focus:outline-none"
          >
            <FiBox className="h-3.5 w-3.5" />
            Try with Sample Data
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FileUploadZone
            label="Resume PDF"
            stepNumber="1"
            file={resume}
            setFile={handleResumeChange}
            onClear={() => setResume(null)}
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
            onClear={() => setCsv(null)}
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
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-50 text-[10px] font-bold text-teal-600">3</span>
              GitHub Username
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <FiGithub className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <input
                type="text"
                id="github-username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g. MrKhan092"
                disabled={loading}
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50/40 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 disabled:opacity-50"
                aria-label="GitHub username"
              />
              {githubUsername.trim() && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <FiCheckCircle className="h-4 w-4 text-emerald-500" />
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
            className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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
                <FiArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Output Config Section */}
      <OutputConfig outputConfig={outputConfig} setOutputConfig={setOutputConfig} />
    </div>
  );
};

export default UploadForm;
