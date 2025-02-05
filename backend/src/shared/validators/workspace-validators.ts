import { z } from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Name is required' })
  .max(255);

export const descriptionSchema = z.string().trim().optional();

export const workspaceIdSchema = z
  .string()
  .trim()
  .uuid()
  .min(1, { message: 'Workspace ID is required' });

export const changeRoleSchema = z.object({
  roleId: z.string().trim().cuid(),
  memberId: z.string().trim().uuid(),
});

export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});
