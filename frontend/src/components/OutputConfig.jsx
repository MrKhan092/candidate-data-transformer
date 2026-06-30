import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiChevronUp, FiChevronDown, FiCheck, FiRotateCcw, FiUpload } from 'react-icons/fi';

// Preset configurations
const PRESETS = {
  default: {
    label: 'Default (All Fields)',
    config: {
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
    }
  },
  minimal: {
    label: 'Minimal (Name + Email)',
    config: {
      fields: [
        { path: "candidate_name", from: "full_name" },
        { path: "email", from: "emails[0]" }
      ],
      include_confidence: false,
      include_provenance: false,
      on_missing: "omit"
    }
  },
  skills: {
    label: 'Skills Focus',
    config: {
      fields: [
        { path: "full_name" },
        { path: "skills", from: "skills[].name" }
      ],
      include_confidence: false,
      include_provenance: false,
      on_missing: "null"
    }
  },
  audit: {
    label: 'Full Audit (With Provenance)',
    config: {
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
    }
  }
};

const OutputConfig = ({ outputConfig, setOutputConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('default');
  const [isCustom, setIsCustom] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(PRESETS.default.config, null, 2));
  const [jsonError, setJsonError] = useState(null);
  const fileInputRef = useRef(null);

  const handlePresetChange = useCallback((presetKey) => {
    setActivePreset(presetKey);
    setIsCustom(false);
    setJsonError(null);
    const config = PRESETS[presetKey].config;
    const text = JSON.stringify(config, null, 2);
    setJsonText(text);
    setOutputConfig(config);
  }, [setOutputConfig]);

  const handleJsonChange = useCallback((e) => {
    const text = e.target.value;
    setJsonText(text);
    setJsonError(null);
    
    try {
      const parsed = JSON.parse(text);
      if (!parsed.fields || !Array.isArray(parsed.fields)) {
        setJsonError('Config must contain a "fields" array');
        return;
      }
      setOutputConfig(parsed);
      
      // Check if it matches any preset
      const matchingPreset = Object.entries(PRESETS).find(
        ([, preset]) => JSON.stringify(preset.config) === JSON.stringify(parsed)
      );
      if (matchingPreset) {
        setActivePreset(matchingPreset[0]);
        setIsCustom(false);
      } else {
        setIsCustom(true);
      }
    } catch {
      setJsonError('Invalid JSON');
    }
  }, [setOutputConfig]);

  const handleReset = useCallback(() => {
    handlePresetChange(activePreset);
  }, [activePreset, handlePresetChange]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.fields || !Array.isArray(parsed.fields)) {
          setJsonError('Uploaded file must contain a "fields" array');
          return;
        }
        const text = JSON.stringify(parsed, null, 2);
        setJsonText(text);
        setOutputConfig(parsed);
        setIsCustom(true);
        setJsonError(null);
      } catch {
        setJsonError('Uploaded file contains invalid JSON');
      }
    };
    reader.readAsText(file);
    // Reset the input so the same file can be re-uploaded
    e.target.value = '';
  }, [setOutputConfig]);

  const currentPresetLabel = isCustom 
    ? 'Custom' 
    : PRESETS[activePreset]?.label || 'Default (All Fields)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="glass-panel w-full rounded-2xl overflow-hidden mt-4"
    >
      {/* Header — clickable to toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <FiSettings className="h-4.5 w-4.5" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800">Output Config</h3>
            <p className="text-[11px] text-slate-400 font-medium">{currentPresetLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCustom && (
            <span className="rounded-lg bg-violet-100 px-2.5 py-1 text-[10px] font-bold text-violet-600 ring-1 ring-violet-200">
              Custom
            </span>
          )}
          {isOpen ? (
            <FiChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <FiChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 space-y-5">
              
              {/* Presets */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Presets</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handlePresetChange(key)}
                      className={`preset-btn ${activePreset === key && !isCustom ? 'active' : ''}`}
                    >
                      {activePreset === key && !isCustom && (
                        <FiCheck className="h-3.5 w-3.5" />
                      )}
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* JSON Config Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">JSON Config</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-violet-600 transition-colors cursor-pointer"
                    >
                      <FiUpload className="h-3 w-3" />
                      Upload
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
                    >
                      <FiRotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  </div>
                </div>
                <textarea
                  value={jsonText}
                  onChange={handleJsonChange}
                  spellCheck={false}
                  className={`json-editor ${jsonError ? '!border-red-300 !ring-red-100' : ''}`}
                  rows={10}
                />
                {jsonError && (
                  <p className="mt-1.5 text-[11px] font-medium text-red-500">{jsonError}</p>
                )}
              </div>

              {/* How it works */}
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[12px] leading-relaxed text-slate-500">
                  <span className="font-bold text-slate-700">How it works:</span>{' '}
                  Edit the JSON to control which fields appear in the output. Use{' '}
                  <code className="font-mono font-bold text-violet-600">"from"</code>{' '}
                  to remap fields, set{' '}
                  <code className="font-mono font-bold text-violet-600">"on_missing"</code>{' '}
                  to{' '}
                  <code className="font-mono text-slate-600">"null"</code>,{' '}
                  <code className="font-mono text-slate-600">"omit"</code>, or{' '}
                  <code className="font-mono text-slate-600">"error"</code>. Toggle{' '}
                  <code className="font-mono font-bold text-violet-600">"include_confidence"</code>{' '}
                  and{' '}
                  <code className="font-mono font-bold text-violet-600">"include_provenance"</code>{' '}
                  on/off.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OutputConfig;
