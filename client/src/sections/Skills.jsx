import React from 'react';
import { skillsCategories } from '../data/portfolioData';
import { Code, Layout, Server, Database, Cloud, Wrench, Binary } from 'lucide-react';

export default function Skills() {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Programming Languages':
        return <Code className="w-5 h-5 text-amber-500" />;
      case 'Frontend Development':
        return <Layout className="w-5 h-5 text-cyan-500" />;
      case 'Backend & APIs':
        return <Server className="w-5 h-5 text-emerald-500" />;
      case 'Databases & Storage':
        return <Database className="w-5 h-5 text-indigo-500" />;
      case 'Cloud & AI Fundamentals':
        return <Cloud className="w-5 h-5 text-violet-500" />;
      case 'Developer Tools':
        return <Wrench className="w-5 h-5 text-rose-500" />;
      case 'Core Computer Science':
        return <Binary className="w-5 h-5 text-blue-500" />;
      default:
        return <Code className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-3">
            Technical Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Categorized Technologies & Competencies
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A comprehensive breakdown of languages, frameworks, backend services, databases, and core concepts applied in my software projects.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cat.category}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 hover:border-brand-500/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
