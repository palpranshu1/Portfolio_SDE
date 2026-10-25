export const personalInfo = {
  fullName: "Pranshu Pal",
  firstName: "Pranshu",
  headline: "Aspiring Software Engineer | MERN Stack Developer | B.Tech CSE '27",
  bio: "Aspiring Software Engineer and Computer Science undergraduate at GLA University with strong fundamentals in Data Structures, Algorithms, Object-Oriented Programming, and full-stack web development. Passionate about engineering clean, maintainable backend APIs, scalable MongoDB architectures, and responsive React applications.",
  email: "palpranshu913@gmail.com",
  phone: "+91 9084895201",
  location: "Mathura, Uttar Pradesh, India",
  university: "GLA University, Mathura",
  degree: "B.Tech in Computer Science and Engineering",
  graduation: "2027",
  status: "Student seeking software engineering, SDE intern, backend, and full-stack development opportunities.",
  socials: {
    github: "https://github.com/palpranshu1",
    linkedin: "https://www.linkedin.com/in/pranshu-pal/",
    leetcode: "https://leetcode.com/u/Pranshu_pal/",
  },
  resumePath: "/resume.pdf",
};

export const skillsCategories = [
  {
    category: "Programming Languages",
    description: "Core languages for algorithmic problem-solving and software development",
    skills: ["Java", "JavaScript", "C#"],
  },
  {
    category: "Frontend Development",
    description: "Modern, component-driven and responsive user interface engineering",
    skills: ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  },
  {
    category: "Backend & APIs",
    description: "Robust server architectures, authentication, and RESTful service design",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    category: "Databases & Storage",
    description: "Relational and NoSQL data modeling, querying, and schema validation",
    skills: ["MongoDB", "Mongoose", "MySQL", "SQL"],
  },
  {
    category: "Cloud & AI Fundamentals",
    description: "Cloud compute, object storage, and generative AI prompt engineering",
    skills: ["AWS EC2", "AWS S3", "Azure OpenAI Service", "Prompt Engineering", "LLM Fundamentals"],
  },
  {
    category: "Developer Tools",
    description: "Version control, API testing, debugging, and IDE tooling",
    skills: ["Git", "GitHub", "Postman", "VS Code"],
  },
  {
    category: "Core Computer Science",
    description: "Foundational computer science principles applied to software engineering",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "API Design", "System Fundamentals"],
  },
];

export const projectsData = [
  {
    id: "foodly",
    title: "Foodly — Food Delivery Application",
    tagline: "Full-stack food ordering and delivery management system built on the MERN stack",
    problemStatement:
      "Modern food delivery platforms require real-time synchronization between order catalogs, interactive shopping carts, stateful user sessions, and secure order processing workflows.",
    solution:
      "Developed an end-to-end food delivery web application using React.js and Express.js. Built a responsive frontend with product categories, persistent cart state, dynamic order placement, order history tracking, and JWT-authenticated user sessions.",
    keyFeatures: [
      "JWT-based user registration, login, and protected user profiles",
      "Dynamic menu catalog browsing with category filtering and real-time search",
      "Persistent cart state management with real-time price calculations",
      "Structured checkout flow and persistent order history in MongoDB",
      "RESTful API architecture with centralized validation and error handling",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    myContribution:
      "Engineered the complete application architecture, including the Mongoose data models for users, items, and orders, secure authentication middleware, and the responsive React user interface.",
    architecture:
      "React Client (Vite) ➔ Axios API Client ➔ Express REST API ➔ JWT Auth Middleware ➔ Mongoose Schemas (User, FoodItem, Order) ➔ MongoDB Database.",
    challenges:
      "Handling race conditions in cart quantity updates and ensuring that unauthorized users cannot view other customers' order history by enforcing token-bound user ID validation on all order endpoints.",
    githubUrl: "https://github.com/palpranshu1",
    liveUrl: "", // Available placeholder
    isLive: false,
    gradient: "from-amber-500/20 to-orange-500/20",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance Management System",
    tagline: "Role-based institutional attendance tracking system with Admin, Faculty, and Student portals",
    problemStatement:
      "Manual and spreadsheet-based academic attendance tracking suffers from data entry errors, lack of centralized auditing, and lack of real-time visibility for students and faculty.",
    solution:
      "Engineered a multi-role web platform allowing faculty members to record course-wise session attendance, administrators to manage branches, courses, and enrollments, and students to monitor their attendance percentages transparently.",
    keyFeatures: [
      "Three distinct role-based access levels: Admin, Faculty, and Student",
      "Faculty portal for class session creation, roll call entry, and attendance submissions",
      "Student dashboard displaying subject-wise attendance percentages and warning indicators",
      "Administrative oversight for student enrollments, faculty course mappings, and audit logs",
      "Mongoose schema design preventing duplicate attendance submissions for the same session",
    ],
    techStack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    myContribution:
      "Designed the role-based access control (RBAC) middleware in Express, built the session attendance recording API, and crafted a responsive dashboard with role-specific navigation guards in React.",
    architecture:
      "Client with Role Guards (Admin / Faculty / Student) ➔ Role Verification Middleware ➔ Course & Session Attendance Controllers ➔ MongoDB Relational References.",
    challenges:
      "Constructing efficient aggregation queries in MongoDB to compute cumulative attendance percentages across multiple semesters without degrading API response times.",
    githubUrl: "https://github.com/palpranshu1",
    liveUrl: "",
    isLive: false,
    gradient: "from-blue-500/20 to-cyan-500/20",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    id: "micro-loan",
    title: "Micro Loan & Credit Scoring Application",
    tagline: "Financial assessment platform evaluating loan eligibility through structured scoring algorithms",
    problemStatement:
      "Underbanked applicants and small business owners often struggle to understand traditional lending eligibility criteria due to opaque review processes.",
    solution:
      "Built a financial workflow web application that collects applicant parameters (income, debt-to-income ratio, repayment history, loan tenor) and applies a transparent, rule-based algorithmic credit scoring model to generate loan eligibility assessments.",
    keyFeatures: [
      "Interactive multi-step loan application form with real-time field validation",
      "Rule-based algorithmic credit scoring engine evaluating financial risk indicators",
      "Instant eligibility breakdown displaying approved credit limits, recommended interest tiers, and risk classifications",
      "Admin review workflow for auditing loan applications and decision logs",
      "Secure MongoDB persistence for loan application state and applicant metrics",
    ],
    techStack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    myContribution:
      "Implemented the deterministic credit scoring calculation engine on the backend, built the applicant submission pipeline with sanitization, and designed the step-by-step visual loan assessment interface.",
    architecture:
      "Step Form Client ➔ Input Validation & Normalization ➔ Backend Scoring Evaluation Engine (Deterministic Matrix) ➔ Application Storage ➔ Decision Summary View.",
    challenges:
      "Designing a deterministic scoring algorithm with edge-case handling for irregular income brackets while keeping the calculation logic fully explainable and auditable in the database.",
    githubUrl: "https://github.com/palpranshu1",
    liveUrl: "",
    isLive: false,
    gradient: "from-violet-500/20 to-indigo-500/20",
    badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
  },
];

export const educationData = [
  {
    institution: "GLA University",
    location: "Mathura, Uttar Pradesh, India",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    duration: "2023 – 2027",
    status: "Currently enrolled (Student)",
    highlights: [
      "Focus areas: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Web Technologies",
      "Active participant in technical problem-solving communities and programming contests",
      "Targeting software engineering, SDE intern, and full-stack development roles",
    ],
  },
];

export const achievementsData = [
  {
    id: "codechef",
    title: "CodeChef Bronze Medal",
    issuer: "CodeChef",
    description: "Awarded Bronze Medal for strong algorithmic performance in CodeChef competitive programming contests.",
    icon: "Medal",
    badge: "Competitive Programming",
  },
  {
    id: "leetcode",
    title: "LeetCode Problem Solver",
    issuer: "LeetCode",
    description: "Consistent problem solver tackling Data Structures and Algorithms challenges across Arrays, Strings, Trees, Graphs, and DP.",
    link: "https://leetcode.com/u/Pranshu_pal/",
    icon: "Code2",
    badge: "DSA & Problem Solving",
  },
  {
    id: "github",
    title: "GitHub Open Source & Projects",
    issuer: "GitHub",
    description: "Continuous version control and open development of full-stack MERN applications, backend APIs, and utility projects.",
    link: "https://github.com/palpranshu1",
    icon: "GitBranch",
    badge: "Open Source & Version Control",
  },
  {
    id: "mern-cert",
    title: "Full-Stack MERN Development Training",
    issuer: "Academic & Technical Training",
    description: "Hands-on engineering training covering React.js, Express.js REST APIs, MongoDB schema design, and asynchronous Node.js architecture.",
    icon: "Layers",
    badge: "Web Development",
  },
];
