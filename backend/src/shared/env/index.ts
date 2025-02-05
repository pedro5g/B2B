import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  BASE_PATH: z.string(),
  SESSION_SECRET: z.string(),
  SESSION_EXPIRES_IN: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),
  FRONTEND_ORIGIN: z.string().url(),
  FRONTEND_GOOGLE_CALLBACK_URL: z.string().url(),
});

const parse = envSchema.safeParse(process.env);

if (!parse.success) {
  console.error('Invalid environment variables ❌❌❌❌❌', parse.error.issues);
  throw new Error('Invalid environment variables');
}

const env = parse.data;
type EnvType = z.infer<typeof envSchema>;

export { env, type EnvType };
