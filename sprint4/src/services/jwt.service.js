import jwt from 'jsonwebtoken';
import config from '../config.js';
import { newError } from '../utils/error.utils.js';

const { JWT_SECRET, TOKEN_EXPIRATION_TIME } = config;

export const generateToken = ({ payload }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
};

export const verifyToken = ({ token }) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    throw newError({ errors: 'Token expired', name: 'TokenExpiredError', status: 401 });
  }
}

export const regenerateToken = ({ token }) => {
  const { payload } = verifyToken({ token });
  return generateToken({ payload });
}