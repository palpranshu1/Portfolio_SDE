import React from 'react';
import { BookOpen, Code, Database, Server, Compass, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const pillars = [
    {
      icon: <Code className="w-5 h-5 text-brand-500" />,
      title: "Problem Solving & DSA",
      description: "Consistent problem solver practicing Data Structures and Algorithms in Java and JavaScript across LeetCode and CodeChef.",
    },
    {
      icon: <Server className="w-5 h-5 text-indigo-500" />,
      title: "Backend & RESTful APIs",
      description: "Architecting modular Express.js servers, JWT authentication workflows, input validation, and secure REST endpoints.",
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      title: "Database Modeling",
      description: "Designing schema validations and relational indexes with MongoDB/Mongoose as well as relational queries in SQL.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-violet-500" />,
      title: "Continuous Learning",
      description: "Undergraduate student at GLA University, continuously deepening concepts in Operating Systems, OOP, and cloud systems.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-3">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education, Technical Foundations & Engineering Philosophy
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            I am a Computer Science undergraduate at GLA University with a strong passion for software engineering, full-stack web development, and problem solving.
          </p>
        </div>

        {/* Grid: Bio Story + Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Bio Details */}
          <div className="lg:col-span-6 space-y-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Currently pursuing my <strong className="text-slate-900 dark:text-white font-semibold">B.Tech in Computer Science and Engineering (Class of 2027)</strong> at GLA University, Mathura. My academic journey is grounded in core computer science disciplines, including Object-Oriented Programming, Data Structures, Algorithms, and Database Management.
            </p>
            <p>
              In full-stack engineering, I specialize in the <strong className="text-brand-600 dark:text-brand-400 font-semibold">MERN Stack (MongoDB, Express.js, React.js, Node.js)</strong>. I enjoy turning functional requirements into structured software architectures — designing robust backend routes, writing clean schema validations, ensuring authentication security with JWT, and pairing them with intuitive React user interfaces.
            </p>
            <p>
              I am actively preparing for software engineering and SDE internship opportunities where I can contribute to high-impact production codebases, collaborate with experienced engineering teams, and expand my backend and distributed systems knowledge.
            </p>

            <div className="pt-2 space-y-2.5">
              {[
                "Strong foundation in Java, JavaScript, and Object-Oriented principles",
                "Hands-on full-stack development experience with real CRUD applications",
                "Committed to clean code, modular architecture, and git-based workflows",
                "Eager to learn, receive feedback, and adapt to modern tech stacks",
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards: Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 w-fit mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
