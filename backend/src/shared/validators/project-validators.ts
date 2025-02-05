import { z } from 'zod';

export const projectIdSchema = z.string().trim().cuid();
export const emojiSchema = z.string().trim().emoji().optional();
export const nameSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const createProjectSchema = z.object({
  name: nameSchema,
  emoji: emojiSchema,
  description: descriptionSchema,
});

export const updateProjectSchema = z.object({
  name: nameSchema,
  emoji: emojiSchema,
  description: descriptionSchema,
});
