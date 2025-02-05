import { config } from '@/shared/config';
import { Router } from 'express';

import passport from 'passport';
import {
  googleLoginCallbackController,
  loginController,
  logoutController,
  registerUserController,
} from '../factory';

const failedURL = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;
const authRoutes = Router();

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
