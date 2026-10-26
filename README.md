<<<<<<< HEAD
# Pranshu Pal — Professional Full-Stack Portfolio & Admin System

A production-ready, full-stack portfolio website and private administration dashboard engineered for **Pranshu Pal** (Aspiring Software Engineer & MERN Stack Developer, B.Tech CSE '27 at GLA University).

Built with **React.js, Vite, Tailwind CSS, Node.js, Express.js, MongoDB (Mongoose), and Nodemailer**.

---

## 🌟 Highlights & Key Features

### 💻 Client / Public Portfolio
- **Modern Design System**: Refined dark theme default with indigo/violet accents and a light/dark theme toggle with persistent state.
- **Sticky Navbar & Smooth Scrolling**: Desktop & responsive mobile drawer navigation to `#home`, `#about`, `#skills`, `#projects`, `#education`, `#achievements`, `#contact`.
- **Hero Section**: Headline, university status, and working direct actions (View Projects, Download Resume, Contact Me, LinkedIn, GitHub, LeetCode).
- **Categorized Technical Skills**: Clean skill badges organized into 7 distinct categories (Languages, Frontend, Backend, Databases, Cloud & AI, Tools, Core Concepts). *No misleading artificial percentage bars.*
- **Featured Projects**:
  - **Foodly**: Full-stack food delivery application (React, Node, Express, MongoDB, JWT).
  - **Smart Attendance Management System**: Multi-role system for Admin, Faculty, and Students with role-based access control (RBAC).
  - **Micro Loan & Credit Scoring Application**: Deterministic algorithmic credit scoring workflow and risk tier assessment.
  - Interactive **Tech Deep Dive Modals** detailing architectural data flow, problem statements, and key challenges solved.
- **Education & Achievements**: GLA University B.Tech CSE credentials, CodeChef Bronze Medal, verified LeetCode problem solving, and GitHub repositories.
- **Production Contact Form**:
  - Full Name, Email, Subject, Message.
  - Dual-layer validation (client-side and server-side).
  - Anti-spam honeypot protection & IP rate limiting.
  - Decoupled database storage (MongoDB) and asynchronous Gmail SMTP notification dispatch.
  - Instant user feedback via animated toast notifications.

### 🔐 Private Admin Dashboard (`/admin/dashboard`)
- **Restricted Access**: Completely protected via server-side JWT authentication (HTTP-only cookies & Bearer tokens) and login rate limiting.
- **Real-Time Database Statistics**: Live counts derived directly from MongoDB for Total, New, Read, and Replied messages.
- **Search & Filtering**: Instant search across sender name, email, and subject; filter by status (`new`, `read`, `replied`).
- **Full Message Management**:
  - Open complete message modal with sender IP and timestamps.
  - Instant status toggle (`new` ⇄ `read` ⇄ `replied`).
  - Delete messages with confirmation guards.
- **Integrated Email Reply Feature**: Send direct email responses to visitors via Nodemailer Gmail SMTP, with a fallback `mailto:` action.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Lucide React |
| **Backend** | Node.js (v18+), Express.js, REST API architecture, Helmet, CORS |
| **Database** | MongoDB Atlas / Local MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs password hashing, Cookie Parser |
| **Email Service**| Nodemailer, Gmail SMTP (Google App Password) |
| **Testing** | Jest, Supertest |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database) |

---

## 📂 Project Architecture

```
pranshu-portfolio/
├── client/                      # React + Vite Frontend
│   ├── public/
│   │   └── resume.pdf           # Downloadable resume document
│   ├── src/
│   │   ├── admin/               # Admin Portal (Login, Dashboard, Reply Modal, Modals)
│   │   ├── components/          # Reusable UI (Navbar, Footer, Toast, ThemeToggle, ProjectModal)
│   │   ├── context/             # AuthContext (JWT management) & ThemeContext
│   │   ├── data/                # Centralized portfolio & projects data
│   │   ├── pages/               # HomePage & NotFoundPage
│   │   ├── sections/            # Hero, About, Skills, Projects, Education, Achievements, Contact
│   │   ├── services/            # API client layer (Fetch wrapper with auth)
│   │   ├── App.jsx              # Application router
│   │   ├── index.css            # Tailwind directives and custom scrollbar
│   │   └── main.jsx
│   ├── vercel.json              # SPA rewrite rule for client routing on Vercel
│   └── vite.config.js
│
├── server/                      # Express.js REST API Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection & Nodemailer configuration
│   │   ├── controllers/         # ContactController & AdminController
│   │   ├── middleware/          # Auth, RateLimiter, Validation & Centralized Error Handlers
│   │   ├── models/              # Mongoose ContactMessage & AdminUser schemas
│   │   ├── routes/              # Health, Contact & Admin REST endpoints
│   │   ├── services/            # Email delivery service (Notification & Reply)
│   │   ├── utils/               # Logger & Admin seeder script
│   │   ├── app.js               # Express application configuration
│   │   └── server.js            # Entry point & graceful shutdown
│   ├── tests/                   # Automated API integration tests (Supertest & Jest)
│   ├── .env.example
│   └── package.json
│
├── package.json                 # Root script runner (dev, build, test, seed)
└── README.md                    # Documentation
```

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js** (v18.0.0 or later installed)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URL.

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/palpranshu1/pranshu-portfolio.git
cd pranshu-portfolio

# Install root, server, and client dependencies
npm install
npm --prefix server install
npm --prefix client install
```

### 3. Configure Server Environment Variables
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/pranshu_portfolio
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
ADMIN_EMAIL=palpranshu913@gmail.com
ADMIN_INITIAL_PASSWORD=Admin@Pranshu2026!
GMAIL_USER=palpranshu913@gmail.com
GMAIL_APP_PASSWORD=your_google_app_password
```

*(Note: If `GMAIL_APP_PASSWORD` is not configured, the backend automatically operates in dry-run mode, safely logging email dispatches to the console while preserving all contact messages in MongoDB).*

### 4. Initialize the Administrator Account
Run the admin seed script:
```bash
npm run seed:admin
```
This hashes the password with `bcryptjs` and creates or updates `palpranshu913@gmail.com` in your database.

### 5. Run Automated Tests
```bash
npm run test:server
```
Runs 11 automated test cases verifying health checks, validation rejections, honeypot spam protection, MongoDB message creation, JWT authentication, statistics aggregation, and status updates.

### 6. Start Development Servers
Run both client and server concurrently:
```bash
npm run dev
```
- Public Portfolio: [http://localhost:5173](http://localhost:5173)
- Admin Login: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- Backend API Health: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📧 Gmail SMTP & Google App Password Setup

To deliver real email notifications to `palpranshu913@gmail.com` whenever a visitor submits a message:

1. Sign in to your Google Account at [myaccount.google.com](https://myaccount.google.com).
2. Go to **Security** ➔ Under *How you sign in to Google*, enable **2-Step Verification**.
3. Under 2-Step Verification, scroll down to **App passwords**.
4. In the "App name" field, enter `Portfolio Website` and click **Create**.
5. Copy the 16-character password generated (e.g. `abcd efgh ijkl mnop`).
6. Paste it into your `server/.env` file:
   ```env
   GMAIL_USER=palpranshu913@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
7. Restart the backend.

---

## 📡 REST API Reference

### Public Endpoints

#### `GET /api/health`
Returns system health, server uptime, and database connection state.
```json
{
  "status": "healthy",
  "uptime": 124,
  "timestamp": "2026-10-26T01:18:15.000Z",
  "environment": "development",
  "database": "connected"
}
```

#### `POST /api/contact`
Submits a new visitor message. Protected by rate limiting (5 req/15 min) and honeypot validation.
- **Body**:
  ```json
  {
    "name": "Jane Recruiter",
    "email": "jane@techcorp.com",
    "subject": "SDE Intern Opportunity",
    "message": "Hi Pranshu, we would like to interview you for an engineering role.",
    "_gotcha": ""
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Thank you! Your message has been sent successfully. I will get back to you soon.",
    "data": { "id": "6ade5cff8d2dca6781d3bfab", "createdAt": "2026-10-26T01:18:15.646Z" }
  }
  ```

---

### Admin Endpoints (Require JWT Authentication)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Authenticate admin, returns JWT & sets HTTP-only cookie. |
| `POST` | `/api/admin/logout`| Clears session cookie and invalidates client session. |
| `GET` | `/api/admin/me` | Verifies current admin profile (`name`, `email`, `role`). |
| `GET` | `/api/admin/stats` | Returns message counts (`total`, `new`, `read`, `replied`). |
| `GET` | `/api/admin/messages` | Paginated message list with `page`, `limit`, `status`, and `search` query parameters. |
| `GET` | `/api/admin/messages/:id` | Returns complete message details and automatically marks `status: 'read'`. |
| `PATCH`| `/api/admin/messages/:id` | Updates message status (`new`, `read`, `replied`). |
| `DELETE`| `/api/admin/messages/:id` | Permanently deletes a message record. |
| `POST` | `/api/admin/messages/:id/reply` | Sends an email reply to the visitor via Nodemailer Gmail SMTP and updates record. |

---

## 🚢 Production Deployment Guide

### 1. Database — MongoDB Atlas
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a user (e.g. `portfolio_admin`) with **Read and write to any database** privilege.
3. Under **Network Access**, click **Add IP Address** ➔ Select **Allow Access From Anywhere (`0.0.0.0/0`)** to allow cloud hosting (Render/Vercel) to connect.
4. Click **Connect** ➔ **Drivers** (Node.js) ➔ Copy connection string:
   ```
   mongodb+srv://portfolio_admin:<password>@cluster0.abcde.mongodb.net/pranshu_portfolio?retryWrites=true&w=majority
   ```

### 2. Backend — Render
1. Create a new **Web Service** on [Render.com](https://render.com).
2. Connect your GitHub repository.
3. Set configuration:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, set:
   ```env
   NODE_ENV=production
   PORT=10000
   CLIENT_URL=https://your-portfolio-domain.vercel.app
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_production_random_secret_string_32_chars_minimum
   ADMIN_EMAIL=palpranshu913@gmail.com
   ADMIN_INITIAL_PASSWORD=YourStrongAdminPassword123!
   GMAIL_USER=palpranshu913@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_google_app_password
   ```
5. Deploy service. Once deployed, note your service URL: `https://your-backend-api.onrender.com`.

### 3. Frontend — Vercel
1. Import your repository into [Vercel](https://vercel.com).
2. Set configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Under **Environment Variables**, set:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.onrender.com
   ```
4. Deploy. The `client/vercel.json` file automatically handles single-page application (SPA) routing for `/admin/login` and `/admin/dashboard`.

---

## 🔒 Security Best Practices Implemented

- **No Secrets Exposed**: Frontend code contains 0 hardcoded credentials or private tokens. All secrets reside exclusively in backend environment variables.
- **Brute-Force & Rate Limiting**: Express-rate-limit protects the admin login endpoint (5 attempts/15 min) and contact submissions (5 requests/15 min).
- **Honeypot Spam Traps**: Invisible input traps automated spam bots without burdening human visitors with disruptive captchas.
- **Safe HTML Escaping**: All visitor messages and fields are escaped using the `validator` library before processing to prevent stored XSS attacks.
- **HTTP Security Headers**: `helmet` enforces strict HTTP headers.
- **Fail-Safe Email Dispatch**: Message saving to MongoDB is independent of email delivery. If Gmail SMTP experiences network latency or quota limits, messages remain safely stored in the database.

---

## 👤 Author & Contact

**Pranshu Pal**  
- **Email**: [palpranshu913@gmail.com](mailto:palpranshu913@gmail.com)  
- **Phone**: [+91 9084895201](tel:+919084895201)  
- **LinkedIn**: [linkedin.com/in/pranshu-pal](https://www.linkedin.com/in/pranshu-pal/)  
- **GitHub**: [github.com/palpranshu1](https://github.com/palpranshu1)  
- **LeetCode**: [leetcode.com/u/Pranshu_pal](https://leetcode.com/u/Pranshu_pal/)  
- **Education**: B.Tech CSE (2023–2027), GLA University, Mathura  
=======
# Portfolio_SDE
>>>>>>> 7205c145c197428a83c6ac23507a7971521fbc46
