require('dotenv').config({ path: __dirname + '/../.env' });
const http = require('http');
const app = require('../src/app');
const connectDB = require('../src/config/db');

async function runE2EVerification() {
  console.log('--- Starting Live E2E Verification ---');
  await connectDB();

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5001, resolve));
  console.log('Verification server listening on http://localhost:5001');

  try {
    // 1. Check /api/health
    console.log('\n[1/4] Testing GET /api/health...');
    const healthRes = await fetch('http://localhost:5001/api/health').then((r) => r.json());
    console.log('Health response:', healthRes);
    if (healthRes.status !== 'healthy') throw new Error('Health check failed');

    // 2. Submit Contact message
    console.log('\n[2/4] Testing POST /api/contact...');
    const contactRes = await fetch('http://localhost:5001/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Google Recruiter',
        email: 'recruiter@google.com',
        subject: 'Software Engineer Role - Campus & Off-Campus Hiring',
        message: 'Hello Pranshu, we reviewed your MERN stack portfolio and would like to invite you for an interview.',
      }),
    }).then((r) => r.json());
    console.log('Contact response:', contactRes);
    if (!contactRes.success) throw new Error('Contact submission failed');

    // 3. Login as Admin
    console.log('\n[3/4] Testing POST /api/admin/login...');
    const loginRes = await fetch('http://localhost:5001/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'palpranshu913@gmail.com',
        password: 'Admin@Pranshu2026!',
      }),
    }).then((r) => r.json());
    console.log('Login response: Success =', loginRes.success, '| Admin =', loginRes.admin?.email);
    if (!loginRes.token) throw new Error('Admin login failed');

    // 4. Fetch Stats with Bearer token
    console.log('\n[4/4] Testing GET /api/admin/stats...');
    const statsRes = await fetch('http://localhost:5001/api/admin/stats', {
      headers: { Authorization: `Bearer ${loginRes.token}` },
    }).then((r) => r.json());
    console.log('Stats response:', statsRes.stats);
    if (statsRes.stats.total < 1) throw new Error('Stats check failed');

    console.log('\n🎉 ALL E2E VERIFICATIONS PASSED SUCCESSFULLY!');
  } finally {
    server.close();
    process.exit(0);
  }
}

runE2EVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
