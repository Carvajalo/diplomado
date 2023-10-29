import user from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.json({ users });

  } catch (error) {
    return res.status(200).json({ message: error.message })
  }
}

export const updateUserById = async (req, res) => {
  try {
    const userFound = await user.findById(req.params.userId);
    
    if (!userFound || (userFound && (!userFound.active || userFound.deletedAt !== null)))
    return res.status(404).json({ message: "User not found" });
  
  const userUpdated = await user.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.json(userUpdated);

  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }

}

export const getUserById = async (req, res) => {
  try {
    const userFound = await user.findById(req.params.userId).select('-password');
    if (!userFound || (userFound && (!userFound.active || userFound.deletedAt !== null))) return res.status(404).json({ message: "User not found" });
    res.json(userFound);
  } catch (error) {
    console.log(error);
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const userFound = await user.findById(req.params.userId);
    if (!userFound || (userFound && (!userFound.active || userFound.deletedAt !== null))) return res.status(404).json({ message: "User not found" });
    await user.updateOne({ _id: req.params.userId }, { active: false, deletedAt: Date.now() });
    res.json({
      message: `User with id: ${req.params.userId} is successfully deleted`,
    });

  } catch (error) {
    console.log(error)
  }
}