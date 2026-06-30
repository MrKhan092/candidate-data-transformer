import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCopy, FiRefreshCw, FiCheckCircle, FiZap, FiArrowRight, FiFileText, FiDatabase, FiGithub, FiLayers, FiShield, FiCpu } from 'react-icons/fi';
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
  const handleTransform = async (resumeFile, csvFile, githubUsername, outputConfig) => {
    setLoading(true);
    setProfile(null);
    const toastId = toast.loading('Initiating AI candidate transformation pipeline...');
    
    try {
      const data = await transformCandidateData(resumeFile, csvFile, githubUsername, outputConfig);
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 ring-1 ring-inset ring-teal-200">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            AI-Powered Pipeline
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
            Transform candidate data.{' '}
            <span className="gradient-text">One unified profile.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-base leading-relaxed">
            Merge resume PDFs, recruiter spreadsheets, and GitHub profiles into a single
            canonical candidate representation with AI-powered intelligence.
          </p>

          {/* Source indicators */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {[
              { icon: FiFileText, label: 'Resume PDF', color: 'text-teal-600 bg-teal-50 ring-teal-200' },
              { icon: FiDatabase, label: 'Recruiter CSV', color: 'text-emerald-600 bg-emerald-50 ring-emerald-200' },
              { icon: FiGithub, label: 'GitHub API', color: 'text-violet-600 bg-violet-50 ring-violet-200' },
            ].map((src, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200 shadow-sm">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${src.color} ring-1`}>
                  <src.icon className="h-2.5 w-2.5" />
                </span>
                <span className="hidden sm:inline">{src.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-10 md:mb-14"
      >
        <div className="glass-panel rounded-2xl px-6 py-5 sm:py-6">
          <div className="flex flex-wrap items-center gap-y-4">
            {/* Description */}
            <div className="hidden lg:block w-[200px] shrink-0 pr-6 border-r border-slate-200">
              <p className="text-sm font-bold text-slate-700 leading-snug">
                A complete AI-powered candidate consolidation pipeline.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-1 items-center justify-around gap-4 sm:gap-6">
              {[
                { value: '3', unit: 'Sources', desc: 'Resume, CSV, GitHub integration' },
                { value: '10', unit: 'Steps', desc: 'End-to-end processing pipeline' },
                { value: '100%', unit: 'Tracked', desc: 'Field-level provenance audit' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center sm:flex-row sm:items-baseline sm:gap-1.5 sm:text-left">
                  <span className="text-2xl font-extrabold text-teal-600 sm:text-3xl">{stat.value}</span>
                  <div>
                    <span className="text-xs font-bold text-slate-500 sm:text-sm">{stat.unit}</span>
                    <p className="text-[10px] text-slate-400 hidden xl:block mt-0.5">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Powered badge */}
            <div className="hidden md:flex items-center shrink-0 pl-6 border-l border-slate-200">
              <div className="flex items-center gap-2.5 rounded-xl bg-violet-50 px-4 py-2.5 ring-1 ring-violet-200">
                <FiCpu className="h-4 w-4 text-violet-600" />
                <div>
                  <p className="text-xs font-bold text-violet-700">AI Powered</p>
                  <p className="text-[10px] text-violet-400">Google Gemini extraction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        
        {/* Left Column: Upload Form + Output Config */}
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
                className="glass-panel flex flex-col justify-center rounded-2xl p-6 shadow-sm min-h-[400px]"
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
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                      <FiCheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Profile Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJson}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-400"
                      title="Copy JSON Payload"
                    >
                      <FiCopy className="h-3 w-3" />
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                    <button
                      onClick={handleDownloadJson}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm shadow-teal-500/10 transition-all hover:bg-teal-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-400"
                      title="Download JSON Payload"
                    >
                      <FiDownload className="h-3 w-3" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 transition-all hover:text-rose-500 hover:bg-rose-50 cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-400"
                      title="Clear session data"
                    >
                      <FiRefreshCw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Cards */}
                <CandidateCard profile={profile} />
                {profile.links && <LinksCard links={profile.links} />}
                {profile.skills && <SkillsCard skills={profile.skills} />}
                {profile.experience && <ExperienceCard experience={profile.experience} />}
                {profile.education && <EducationCard education={profile.education} />}
                {profile.provenance && <ProvenanceCard provenance={profile.provenance} />}
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
                    <div className="h-20 w-20 animate-ping rounded-full bg-teal-100/50" />
                  </div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                    <FiLayers className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-slate-700">Ready to Transform</h3>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
                  Upload a resume PDF, recruiter CSV, and provide a GitHub username — or click "Try with Sample Data" to see it in action.
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-500/70">
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
