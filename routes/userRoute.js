import express from 'express';
import { getAllUsers, createUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to create a new User
router.post('/save', createUser);

export default router;