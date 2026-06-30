import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCopy, FiRefreshCw, FiCheckCircle, FiZap, FiArrowRight, FiFileText, FiDatabase, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';

import UploadForm from '../components/UploadForm';
import Loading from '../components/Loading';
import CandidateCard from '../components/CandidateCard';
import LinksCard from '../components/LinksCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import EducationCard from '../components/EducationCard';
import ProvenanceCard from '../components/ProvenanceCard';
import { transformCandidateData } from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  // Triggers API pipeline
  const handleTransform = async (resumeFile, csvFile, githubUsername) => {
    setLoading(true);
    setProfile(null);
    const toastId = toast.loading('Initiating AI candidate transformation pipeline...');
    
    try {
      const data = await transformCandidateData(resumeFile, csvFile, githubUsername);
      setProfile(data);
      toast.success('Successfully consolidated profile data!', { id: toastId });
    } catch (err) {
      toast.error(err.message || 'Pipeline transformation failed.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Resets consolidation state
  const handleReset = () => {
    setProfile(null);
    toast.success('Cleared session candidate data.');
  };

  // Copies JSON payload to clipboard
  const handleCopyJson = () => {
    if (!profile) return;
    navigator.clipboard.writeText(JSON.stringify(profile, null, 2));
    toast.success('Profile JSON payload copied to clipboard.');
  };

  // Downloads JSON payload
  const handleDownloadJson = () => {
    if (!profile) return;
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${
      profile.full_name ? profile.full_name.toLowerCase().replace(/\s+/g, '_') : 'candidate'
    }_profile.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Candidate profile JSON downloaded.');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="mb-10 text-center md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 ring-1 ring-inset ring-blue-500/20">
            <FiZap className="h-3 w-3" />
            AI-Powered Pipeline
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Candidate <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Transformer</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            Merge resume PDFs, recruiter spreadsheets, and GitHub profiles into a single canonical candidate representation.
          </p>

          {/* Source indicators */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {[
              { icon: FiFileText, label: 'Resume PDF', color: 'text-blue-400 bg-blue-500/10' },
              { icon: FiDatabase, label: 'Recruiter CSV', color: 'text-emerald-400 bg-emerald-500/10' },
              { icon: FiGithub, label: 'GitHub API', color: 'text-purple-400 bg-purple-500/10' },
            ].map((src, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-full bg-slate-800/30 px-3 py-1.5 text-[10px] font-semibold text-slate-400 ring-1 ring-white/5">
                <span className={`flex h-4 w-4 items-center justify-center rounded-full ${src.color}`}>
                  <src.icon className="h-2.5 w-2.5" />
                </span>
                <span className="hidden sm:inline">{src.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        
        {/* Left Column: Upload Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <UploadForm onSubmit={handleTransform} loading={loading} />
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="glass-panel flex flex-col justify-center rounded-2xl p-6 shadow-lg min-h-[400px]"
              >
                <Loading />
              </motion.div>
            )}

            {!loading && profile && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Action Bar */}
                <div className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <FiCheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-300">Profile Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJson}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/30 px-3 py-1.5 text-[11px] font-bold text-slate-400 transition-all hover:bg-slate-800 hover:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                      title="Copy JSON Payload"
                    >
                      <FiCopy className="h-3 w-3" />
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                    <button
                      onClick={handleDownloadJson}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm shadow-blue-500/10 transition-all hover:bg-blue-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400"
                      title="Download JSON Payload"
                    >
                      <FiDownload className="h-3 w-3" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/30 p-1.5 text-slate-500 transition-all hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-500"
                      title="Clear session data"
                    >
                      <FiRefreshCw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Cards */}
                <CandidateCard profile={profile} />
                <LinksCard links={profile.links} />
                <SkillsCard skills={profile.skills} />
                <ExperienceCard experience={profile.experience} />
                <EducationCard education={profile.education} />
                <ProvenanceCard provenance={profile.provenance} />
              </motion.div>
            )}

            {!loading && !profile && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel flex flex-col items-center justify-center rounded-2xl p-10 text-center min-h-[420px]"
              >
                {/* Animated circles */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 animate-ping rounded-full bg-blue-500/5" />
                  </div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/60 ring-1 ring-white/5">
                    <FiZap className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-white">Ready to Transform</h3>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
                  Upload a resume PDF, recruiter CSV, and provide a GitHub username to generate a unified candidate profile.
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400/60">
                  <span>Awaiting inputs</span>
                  <FiArrowRight className="h-3 w-3 animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
};

export default Home;
