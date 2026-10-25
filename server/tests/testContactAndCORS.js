require('dotenv').config({ path: __dirname + '/../.env' });
const http = require('http');
const app = require('../src/app');
const connectDB = require('../src/config/db');
const ContactMessage = require('../src/models/ContactMessage');

async function testContactAndCORS() {
  console.log('--- Verifying Contact Form & CORS Fix ---');
  await connectDB();

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5000, '0.0.0.0', resolve));
  console.log('Live backend server running on http://127.0.0.1:5000');

  try {
    // Test 1: OPTIONS preflight from http://localhost:5173
    console.log('\n[1] Testing OPTIONS preflight from http://localhost:5173...');
    const preflight1 = await fetch('http://127.0.0.1:5000/api/contact', {
      method: 'OPTIONS',
      headers: {
        Origin: 'http://localhost:5173',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    console.log('Preflight 5173 Status:', preflight1.status);
    console.log('Access-Control-Allow-Origin:', preflight1.headers.get('access-control-allow-origin'));
    if (!preflight1.headers.get('access-control-allow-origin')) {
      throw new Error('Preflight for 5173 failed: Missing Access-Control-Allow-Origin header');
    }

    // Test 2: OPTIONS preflight from http://localhost:5174 (which previously caused 500 Error!)
    console.log('\n[2] Testing OPTIONS preflight from http://localhost:5174 (Dynamic dev port)...');
    const preflight2 = await fetch('http://127.0.0.1:5000/api/contact', {
      method: 'OPTIONS',
      headers: {
        Origin: 'http://localhost:5174',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    console.log('Preflight 5174 Status:', preflight2.status);
    console.log('Access-Control-Allow-Origin:', preflight2.headers.get('access-control-allow-origin'));
    if (preflight2.status >= 400 || !preflight2.headers.get('access-control-allow-origin')) {
      throw new Error('Preflight for 5174 failed: Rejected by CORS');
    }

    // Test 3: Actual POST /api/contact from http://localhost:5173
    console.log('\n[3] Testing POST /api/contact submission from http://localhost:5173...');
    const postRes = await fetch('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: {
        Origin: 'http://localhost:5173',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Pranshu Recruiter',
        email: 'recruiter.contact@testcorp.com',
        subject: 'Full-Stack SDE Role',
        message: 'Hello Pranshu, we tested the contact form and it successfully connected to MongoDB and Express!',
      }),
    });

    console.log('POST Status:', postRes.status);
    console.log('POST Access-Control-Allow-Origin:', postRes.headers.get('access-control-allow-origin'));
    const postBody = await postRes.json();
    console.log('POST Response Body:', postBody);

    if (postRes.status !== 201 || !postBody.success) {
      throw new Error(`Contact POST failed with status ${postRes.status}`);
    }

    // Test 4: Verify in MongoDB
    console.log('\n[4] Verifying record stored in MongoDB...');
    const messageDoc = await ContactMessage.findById(postBody.data.id);
    if (!messageDoc) {
      throw new Error('Message not found in MongoDB database');
    }
    console.log('MongoDB Verified Record:');
    console.log('  ID:', messageDoc._id.toString());
    console.log('  Name:', messageDoc.name);
    console.log('  Email:', messageDoc.email);
    console.log('  Status:', messageDoc.status);
    console.log('  CreatedAt:', messageDoc.createdAt);

    // Clean up test document
    await ContactMessage.findByIdAndDelete(messageDoc._id);
    console.log('\n🎉 ALL CONTACT FORM & CORS CHECKS PASSED WITH FLYING COLORS!');
  } finally {
    server.close();
    process.exit(0);
  }
}

testContactAndCORS().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
