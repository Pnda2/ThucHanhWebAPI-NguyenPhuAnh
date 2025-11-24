<<<<<<< HEAD
import { users } from '../model/users.js';

//lay toan bo user
export const getAllUsers = (req, res) => {
    res.status(200).json(users);
};

//lay user theo id
export const getUserById = (req, res) => {
    const Id = parseInt(req.params.id);
    const user = users.find(u => u.id === Id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ 
          status: 404,
          message: 'User by ${Id} not found' });
    }
};
=======
import { userRepo } from "../repositories/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userRepo.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
>>>>>>> d3860792b63d0e4f1f30e12ca36de934591a65e1
