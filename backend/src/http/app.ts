import express from 'express';
import cors from 'cors';
import session from 'cookie-session';
import { config } from '@/shared/config';
import { errorHandler } from '@/shared/middleware/error-handler';
import { passport } from '@/shared/config/passport-config';
import { authRoutes } from '@/modules/auth/infra/http/routes';
import { isAuthenticated } from '@/shared/middleware/is-authenticated';
import { userRoutes } from '@/modules/user/infra/http/routes';
import { workspaceRoutes } from '@/modules/workspace/infra/http/routes';
import { memberRoutes } from '@/modules/member/infra/http/routes';
import { projectRoutes } from '@/modules/project/infra/http/routes';
import { taskRoutes } from '@/modules/task/infra/http/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'session',
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: config.NODE_ENV === 'prod',
    httpOnly: true,
    sameSite: 'lax',
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));

const BASE_PATH = config.BASE_PATH;
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);

app.use(errorHandler);

export { app };
