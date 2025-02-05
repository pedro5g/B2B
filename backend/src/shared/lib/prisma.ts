import { PrismaClient } from '@prisma/client';
import { config } from '../config';

const prisma = new PrismaClient({
  log: config.NODE_ENV === 'dev' ? ['query', 'info'] : [],
});

export { prisma };
