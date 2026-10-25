import React from 'react';
import { achievementsData, personalInfo } from '../data/portfolioData';
import { Medal, Code2, GitBranch, Layers, ExternalLink, CheckCircle } from 'lucide-react';

export default function Achievements() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Medal':
        return <Medal className="w-6 h-6 text-amber-500" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-brand-500" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6 text-emerald-500" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-violet-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-brand-500" />;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-3">
            Achievements & Profiles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Competitive Programming & Verified Milestones
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Tangible problem-solving accomplishments, competitive coding recognition, and active development profiles.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
                    {getIcon(item.icon)}
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-1">
                  Issued by {item.issuer}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.link && (
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors"
                  >
                    <span>View Verified Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick LeetCode / GitHub Direct Links Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-brand-900/40 via-indigo-900/30 to-violet-900/40 border border-brand-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">
              Explore My Code Repositories & Problem Solving
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Check out solved algorithmic questions and open-source software contributions directly.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={personalInfo.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>LeetCode Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub Repos</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
