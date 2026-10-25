const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const ContactMessage = require('../src/models/ContactMessage');
const AdminUser = require('../src/models/AdminUser');

beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pranshu_portfolio_test';
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await ContactMessage.deleteMany({ email: /@test\.com$/ });
  await mongoose.disconnect();
});

describe('1. Health Check API', () => {
  it('GET /api/health should return status healthy', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('database');
  });
});

describe('2. Contact Submission API', () => {
  it('POST /api/contact should reject missing or invalid fields', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: 'invalid-email',
        subject: 'Hi',
        message: 'Short',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/contact should silently trap honeypot submissions', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        subject: 'Spam Offer',
        message: 'Buy cheap items at link dot com now',
        _gotcha: 'http://spam.link',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/contact should successfully save a valid message', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Tech Recruiter',
        email: 'recruiter@test.com',
        subject: 'Software Engineer Opportunity',
        message: 'Hello Pranshu, we were impressed by your MERN stack portfolio and would love to interview you.',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');

    // Verify persisted in MongoDB
    const saved = await ContactMessage.findById(res.body.data.id);
    expect(saved).not.toBeNull();
    expect(saved.name).toBe('Tech Recruiter');
    expect(saved.status).toBe('new');
  });
});

describe('3. Admin Authentication & Management APIs', () => {
  let adminToken = '';
  let testMessageId = '';

  it('POST /api/admin/login should reject incorrect password', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({
        email: 'palpranshu913@gmail.com',
        password: 'WrongPassword123!',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/admin/login should succeed with correct credentials', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({
        email: 'palpranshu913@gmail.com',
        password: 'Admin@Pranshu2026!',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    expect(res.body.admin.email).toBe('palpranshu913@gmail.com');
    adminToken = res.body.token;
  });

  it('GET /api/admin/stats should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/admin/stats');
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/admin/stats should return counts for authenticated admin', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toHaveProperty('total');
    expect(res.body.stats).toHaveProperty('new');
  });

  it('GET /api/admin/messages should return paginated message list', async () => {
    const res = await request(app)
      .get('/api/admin/messages?limit=5')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.messages)).toBe(true);
    expect(res.body.pagination).toHaveProperty('page');
    expect(res.body.messages.length).toBeGreaterThan(0);
    testMessageId = res.body.messages[0]._id;
  });

  it('PATCH /api/admin/messages/:id should update status to read or replied', async () => {
    const res = await request(app)
      .patch(`/api/admin/messages/${testMessageId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'read' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('read');
  });

  it('DELETE /api/admin/messages/:id should delete message', async () => {
    const res = await request(app)
      .delete(`/api/admin/messages/${testMessageId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
