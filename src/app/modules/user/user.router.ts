import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
} from './user.controller';

const router = Router();

// POST endpoint for creating a new user
router.post('/', createUserController);

// GET endpoint for getting all users
router.get('/', getAllUsersController);

// GET endpoint for getting a user by id
router.get('/:userId', getUserByIdController);

// Delete endpoint for deleting a user by id
router.delete('/:userId', deleteUserController);

export const UserRoutes = router;
