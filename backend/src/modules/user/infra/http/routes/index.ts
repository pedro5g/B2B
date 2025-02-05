import { Router } from 'express';
import { getCurrentUserController } from '../factory';

const userRoutes = Router();

userRoutes.get('/current', getCurrentUserController.handle);

export { userRoutes };
