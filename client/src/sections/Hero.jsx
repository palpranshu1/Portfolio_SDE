import React from 'react';
import { ArrowRight, FileDown, Github, Linkedin, Mail, Terminal, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Radial Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Actively seeking SDE Intern & Full-Stack Opportunities</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-500">{personalInfo.fullName}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300">
                An Aspiring Software Engineer and MERN Stack Developer building practical, scalable web applications.
              </p>
            </div>

            {/* University & Degree Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-brand-500" />
                B.Tech CSE '27 — GLA University
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                Mathura, Uttar Pradesh, India
              </span>
            </div>

            {/* Working Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md shadow-brand-500/25 hover:shadow-lg transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={personalInfo.resumePath}
                download="Pranshu_Pal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm shadow-sm transition-all"
              >
                <FileDown className="w-4 h-4 text-brand-500" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white font-medium text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Socials Bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-slate-500 dark:text-slate-400">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mr-1">Find me on:</span>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LeetCode"
              >
                LeetCode
              </a>
            </div>
          </div>

          {/* Minimalist Technical Terminal Card (Tasteful, No fake statistics) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden glow-effect-card">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>pranshu@dev:~/profile</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Code Snippet Content */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed space-y-2 text-slate-800 dark:text-slate-200">
                <p>
                  <span className="text-brand-500 dark:text-brand-400">const</span> developer = &#123;
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-600 dark:text-emerald-400">'{personalInfo.fullName}'</span>,
                </p>
                <p className="pl-4">
                  degree: <span className="text-emerald-600 dark:text-emerald-400">'B.Tech CSE (2023-2027)'</span>,
                </p>
                <p className="pl-4">
                  university: <span className="text-emerald-600 dark:text-emerald-400">'GLA University, Mathura'</span>,
                </p>
                <p className="pl-4">
                  coreStack: [<span className="text-amber-600 dark:text-amber-400">'React'</span>, <span className="text-amber-600 dark:text-amber-400">'Node.js'</span>, <span className="text-amber-600 dark:text-amber-400">'Express'</span>, <span className="text-amber-600 dark:text-amber-400">'MongoDB'</span>],
                </p>
                <p className="pl-4">
                  languages: [<span className="text-amber-600 dark:text-amber-400">'Java'</span>, <span className="text-amber-600 dark:text-amber-400">'JavaScript'</span>, <span className="text-amber-600 dark:text-amber-400">'C#'</span>],
                </p>
                <p className="pl-4">
                  focus: <span className="text-emerald-600 dark:text-emerald-400">'DSA, REST APIs & Scalable Web Apps'</span>,
                </p>
                <p className="pl-4">
                  openForWork: <span className="text-violet-600 dark:text-violet-400 font-bold">true</span>,
                </p>
                <p>&#125;;</p>
              </div>

              <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  CodeChef Bronze Medalist
                </span>
                <span>Active on LeetCode & GitHub</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
