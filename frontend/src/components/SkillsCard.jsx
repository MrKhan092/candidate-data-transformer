import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiServer, FiDatabase, FiCloud, FiTool, FiGrid } from 'react-icons/fi';

const SKILL_CATEGORIES = {
  Languages: {
    icon: FiCode,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/15',
    chipColor: 'border-blue-500/20 bg-blue-500/8 text-blue-300',
    keywords: ['python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'rust', 'go', 'golang', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'r', 'bash', 'sql', 'html', 'css'],
  },
  Frontend: {
    icon: FiLayers,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/15',
    chipColor: 'border-purple-500/20 bg-purple-500/8 text-purple-300',
    keywords: ['react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs', 'tailwind', 'tailwind css', 'bootstrap', 'ejs', 'framer motion', 'redux'],
  },
  Backend: {
    icon: FiServer,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15',
    chipColor: 'border-emerald-500/20 bg-emerald-500/8 text-emerald-300',
    keywords: ['node.js', 'nodejs', 'express', 'express.js', 'fastapi', 'django', 'flask', 'spring', 'nestjs', 'restful apis', 'graphql', 'passport.js', 'jwt', 'oauth2', 'nodemailer'],
  },
  Database: {
    icon: FiDatabase,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/15',
    chipColor: 'border-amber-500/20 bg-amber-500/8 text-amber-300',
    keywords: ['mongodb', 'postgresql', 'mysql', 'redis', 'sqlite', 'firebase', 'prisma', 'prisma orm', 'dynamodb', 'elasticsearch'],
  },
  Cloud: {
    icon: FiCloud,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/15',
    chipColor: 'border-cyan-500/20 bg-cyan-500/8 text-cyan-300',
    keywords: ['aws', 'gcp', 'azure', 'docker', 'kubernetes', 'vercel', 'netlify', 'heroku', 'cloudinary', 'razorpay'],
  },
  Tools: {
    icon: FiTool,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/15',
    chipColor: 'border-rose-500/20 bg-rose-500/8 text-rose-300',
    keywords: ['git', 'github', 'vs code', 'postman', 'intellij', 'jira', 'figma', 'webpack', 'vite', 'eslint'],
  },
};

const categorizeSkills = (skills) => {
  const categorized = {};
  const others = [];

  for (const cat of Object.keys(SKILL_CATEGORIES)) {
    categorized[cat] = [];
  }

  skills.forEach((skill) => {
    const skillName = typeof skill === 'object' && skill !== null ? skill.name : skill;
    if (!skillName) return;
    const lower = skillName.toLowerCase().trim();

    let placed = false;
    for (const [category, config] of Object.entries(SKILL_CATEGORIES)) {
      if (config.keywords.some((kw) => lower === kw || lower.includes(kw))) {
        categorized[category].push(skillName);
        placed = true;
        break;
      }
    }
    if (!placed) others.push(skillName);
  });

  return { categorized, others };
};

const SkillsCard = ({ skills = [] }) => {
  if (!skills || skills.length === 0) return null;

  const { categorized, others } = categorizeSkills(skills);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  };

  const renderCategory = (name, items, config) => {
    if (items.length === 0) return null;
    const Icon = config.icon;

    return (
      <div key={name} className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className={`flex h-6 w-6 items-center justify-center rounded-md border ${config.color}`}>
            <Icon className="h-3 w-3" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{name}</span>
          <span className="rounded bg-slate-800/50 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">{items.length}</span>
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
          {items.map((skillName, idx) => (
            <motion.span
              key={idx}
              variants={chipVariants}
              whileHover={{ scale: 1.05 }}
              className={`inline-flex cursor-default items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${config.chipColor}`}
            >
              {skillName}
            </motion.span>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="glass-card w-full rounded-2xl p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FiGrid className="h-4.5 w-4.5 text-blue-500" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Technical Skills</h4>
        </div>
        <span className="rounded-lg bg-slate-800/50 px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-white/5">
          {skills.length} total
        </span>
      </div>

      <div className="space-y-5">
        {Object.entries(SKILL_CATEGORIES).map(([name, config]) =>
          renderCategory(name, categorized[name], config)
        )}
        {others.length > 0 &&
          renderCategory('Others', others, {
            icon: FiGrid,
            color: 'text-slate-400 bg-slate-500/10 border-slate-500/15',
            chipColor: 'border-slate-700 bg-slate-800/50 text-slate-300',
          })}
      </div>
    </motion.div>
  );
};

export default SkillsCard;
