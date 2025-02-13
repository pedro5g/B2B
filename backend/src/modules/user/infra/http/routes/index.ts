import { Router } from 'express';
import { getCurrentUserController } from '../factory';
import { mockPatchingRouter } from '@/http/route';

const userRoutes = mockPatchingRouter(Router());

userRoutes.get('/current', getCurrentUserController.handle);

export { userRoutes };
