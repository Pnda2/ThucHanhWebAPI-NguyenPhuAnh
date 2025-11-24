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