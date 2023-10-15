import jwt from 'jsonwebtoken';
import config from '../config.js';

const { JWT_SECRET, TOKEN_EXPIRATION_TIME } = config;

export const generateToken = ({ payload }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
};

export const verifyToken = ({ token }) => {
  return jwt.verify(token, JWT_SECRET);
}

export const regenerateToken = ({ token }) => {
  const { payload } = verifyToken({ token });
  return generateToken({ payload });
}