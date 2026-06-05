import jwt from 'jsonwebtoken';

export function createToken(user, jwtSecret) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    jwtSecret,
    { expiresIn: '8h' },
  );
}

export function authenticate(jwtSecret) {
  return (request, response, next) => {
    const authorization = request.get('Authorization') || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

    if (!token) {
      return response.status(401).json({ error: 'Authentication required.' });
    }

    try {
      request.user = jwt.verify(token, jwtSecret);
      return next();
    } catch {
      return response.status(401).json({ error: 'Your session is invalid or expired.' });
    }
  };
}

export function requireRole(role) {
  return (request, response, next) => {
    if (request.user?.role !== role) {
      return response.status(403).json({ error: 'You do not have permission to perform this action.' });
    }
    return next();
  };
}
