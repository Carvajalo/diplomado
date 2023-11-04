import User from '../models/user.js';
import { generateToken } from '../services/jwt.service.js';
import { verifyToken } from '../services/jwt.service.js';
import { newError } from '../utils/error.utils.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) return res.status(400).json({ message: 'Email and Password are required' });
    const user = (await User.findOne({ email })) || (await User.findOne({ name: email }));
    if (!user) return res.status(404).json({ message: 'Email or Username incorrect' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(404).json({ message: 'Password incorrect' });
    const { role, name } = user;
    const payload = { id: user._id, role, name };
    const token = generateToken({ payload });
    return res.status(200).json({ token, role: user.role, name: user.name });
  } catch (e) {
    res.status(400).json({ message: e.message, line: e.stack });
  }
}

export const signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const userSaved = await newUser.save();
    res.status(202).json(userSaved);
  } catch (error) {
    console.log(error)
    return res.status(error.status || 400).json({ message: error.message });
  }
}

export const validateAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ message: 'Token is required' });
    const token = authorization.split(' ')[1];
    const { role } = verifyToken({ token });
    console.log({role})
    if (role !== "admin") return res.status(401).json({ message: 'Unauthorized' });
    req.role = role;
    next();
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
