import { Router } from 'express';
import { createUserController, getAllUsersController } from './user.controller';

const router = Router();

// POST endpoint for creating a new user
router.post('/', createUserController);

// GET endpoint for getting all users
router.get('/', getAllUsersController);

export const UserRoutes = router;
