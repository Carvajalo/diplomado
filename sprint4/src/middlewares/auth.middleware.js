import * as jwt from '../services/jwt.service.js';
import { ErrorException, newError } from '../utils/error.utils.js';

/* !For latter:
const role = {
  ADMIN: (callback) => callback(),
  USER: (callback) => callback(),
  unauthorized: (res) => res.status(401).json({ message: 'Unauthorized' }),
}
 */

const role = {
  admin: (callback) => {
    callback()
  },
  operator: (callback) => callback(),
  user: (callback) => callback(),
}

export const roleValidation = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const { role } = req.body;
    if (!role) return next();
    if (!token)
      return res.status(401).json({ message: 'Unauthorized' });
    const user = jwt.verifyToken({ token });
    if (!user || user.role !== "admin")
      return res.status(401).json({ message: 'Unauthorized' });
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
}


const validateTokenRole = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const user = jwt.verifyToken({ token });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    role[user.role](() => next());

  } catch (e) {

  }
}



export const validateAdmin = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const user = jwt.verifyToken({ token });
    if (user.role !== "admin") {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}



export const userAuthMiddleware = (req, res, next) => {
  try {
    const token = req.token;
    const user = jwt.verifyToken({ token });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const userCredentials = (req, res, next) => {
  try {
    const token = req?.headers['authorization']?.split(' ')[1];
    if(!token) throw newError({ errors: 'Unauthorized' });
    const user = jwt.verifyToken({ token });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}