import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, test } from 'node:test';
import { apiRequest, clearSession, getSession, saveSession } from './api.js';

let stored;
let originalFetch;

beforeEach(() => {
  stored = new Map();
  globalThis.localStorage = {
    getItem: (key) => stored.get(key) || null,
    setItem: (key, value) => stored.set(key, value),
    removeItem: (key) => stored.delete(key),
  };
  originalFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete globalThis.localStorage;
});

describe('frontend API client', () => {
  test('saves and clears the authenticated session', () => {
    const session = { token: 'token-value', user: { role: 'admin' } };

    saveSession(session);
    assert.deepEqual(getSession(), session);

    clearSession();
    assert.equal(getSession(), null);
  });

  test('attaches the stored token and parses JSON responses', async () => {
    saveSession({ token: 'token-value', user: { role: 'admin' } });
    globalThis.fetch = async (_path, options) => {
      assert.equal(options.headers.Authorization, 'Bearer token-value');
      return {
        ok: true,
        status: 200,
        json: async () => ({ employees: [] }),
      };
    };

    const result = await apiRequest('/api/employees');
    assert.deepEqual(result, { employees: [] });
  });

  test('throws the API error message for unsuccessful requests', async () => {
    globalThis.fetch = async () => ({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Email or password is incorrect.' }),
    });

    await assert.rejects(() => apiRequest('/api/auth/login'), {
      message: 'Email or password is incorrect.',
    });
  });
});
