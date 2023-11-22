import { Router } from 'express';
import { createUserController } from './user.controller';

const router = Router();

// POST endpoint for creating a new user
router.post('/', createUserController);

export const UserRoutes = router;
