import { z } from 'zod';

export const inviteCodeSchema = z.string().min(8).max(8);
