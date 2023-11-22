import { Router } from 'express';
import {
  addOrderController,
  createUserController,
  deleteUserController,
  getAllUsersController,
  getOrdersController,
  getUserByIdController,
  updateUserController,
} from './user.controller';

const router = Router();

// POST endpoint for creating a new user
router.post('/', createUserController);

// GET endpoint for getting all users
router.get('/', getAllUsersController);

// GET endpoint for getting a user by id
router.get('/:userId', getUserByIdController);

// Update endpoint for updating a user by id
router.put('/:userId', updateUserController);

// Delete endpoint for deleting a user by id
router.delete('/:userId', deleteUserController);

// Add order endpoint for adding an order to a user
router.put('/:userId/orders', addOrderController);

// Get orders endpoint for getting orders of a user
router.get('/:userId/orders', getOrdersController);

export const UserRoutes = router;
