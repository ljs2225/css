import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('POST /api/sessions', () => {
  test('rejects an invalid payload', async () => {
    const app = createApp();
    const res = await request(app).post('/api/sessions').send({});
    assert.equal(res.status, 400);
  });
});
