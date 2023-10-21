import User from '../models/user.js';
import { generateToken } from '../services/jwt.service.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and Password are required' });
    const user = (await User.findOne({ email })) || (await User.findOne({ name: email }));
    if (!user) return res.status(404).json({ message: 'Email or Username incorrect' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(404).json({ message: 'Password incorrect' });
    const { role, name } = user;
    const payload = { id: user._id, role, name };
    const token = generateToken({ payload });
    return res.status(200).json({ token, role: user.role });
  } catch (e) {
    res.status(400).json({ message: e.message, line: e.stack });
  }
}