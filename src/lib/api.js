const sessionKey = 'workforce-session';

export function getSession() {
  try {
    const value = globalThis.localStorage?.getItem(sessionKey);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  globalThis.localStorage?.setItem(sessionKey, JSON.stringify(session));
}

export function clearSession() {
  globalThis.localStorage?.removeItem(sessionKey);
}

export async function apiRequest(path, options = {}) {
  const session = getSession();
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
    ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
  };

  const response = await fetch(path, { ...options, headers });
  if (response.status === 204) {
    return null;
  }

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || 'The request could not be completed.');
  }
  return body;
}
