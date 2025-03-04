import { getEnv } from '../utils/get-env';

const appConfig = () => ({
  PORT: getEnv('PORT'),
  NODE_ENV: getEnv('NODE_ENV'),
  BASE_PATH: getEnv('BASE_PATH'),
  SESSION_SECRET: getEnv('SESSION_SECRET'),
  SESSION_EXPIRES_IN: getEnv('SESSION_EXPIRES_IN'),
  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
  GOOGLE_CALLBACK_URL: getEnv('GOOGLE_CALLBACK_URL'),
  FRONTEND_ORIGIN: getEnv('FRONTEND_ORIGIN'),
  FRONTEND_GOOGLE_CALLBACK_URL: getEnv('FRONTEND_GOOGLE_CALLBACK_URL'),
});

export const config = appConfig();
