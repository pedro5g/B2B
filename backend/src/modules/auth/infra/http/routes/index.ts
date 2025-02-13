import { config } from '@/shared/config';
import { mockPatchingRouter } from '@/http/route';

import passport from 'passport';
import {
  googleLoginCallbackController,
  loginController,
  logoutController,
  registerUserController,
} from '../factory';
import { Router } from 'express';

const failedURL = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;
const authRoutes = mockPatchingRouter(Router());

// local authentication with email and password
authRoutes.post('/register', registerUserController.handle);
authRoutes.post('/login', loginController.handle);
authRoutes.get('/logout', logoutController.handle);

// google authentication
authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: failedURL }),
  googleLoginCallbackController.handle,
);

export { authRoutes };
