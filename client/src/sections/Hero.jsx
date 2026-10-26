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

         
{/* Professional Profile Photo */}
<div className="lg:col-span-5 flex justify-center">
  <div className="relative w-full max-w-sm">

    {/* Background glow */}
    <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-violet-500/20 to-indigo-500/30 blur-2xl" />

    {/* Photo frame */}
    <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/30 bg-white dark:bg-slate-900 shadow-2xl">
      <img
        src="/profile.png"
        alt="Pranshu Pal - Software Engineer"
        className="block w-full aspect-[4/5] object-cover object-top"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Bottom profile label */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 pt-16">
        <p className="text-xl font-bold text-white">
          {personalInfo.fullName}
        </p>
        <p className="mt-1 text-sm text-slate-200">
          MERN Stack Developer
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Open to Opportunities
        </div>
      </div>
    </div>

  </div>
</div>


        </div>
      </div>
    </section>
  );
}
