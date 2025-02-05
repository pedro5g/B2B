import { array, z } from 'zod';
import {
  TaskPriorityEnum,
  TaskPriorityType,
  TaskStatusEnum,
  TaskStatusType,
} from '../enums/task';
import { projectIdSchema } from './project-validators';

export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();
export const assignedToSchema = z.string().uuid();

const priorityEnum = Object.values(TaskPriorityEnum) as [
  TaskPriorityType,
  ...TaskPriorityType[],
];
export const prioritySchema = z.enum(priorityEnum);

const statusEnum = Object.values(TaskStatusEnum) as [
  TaskStatusType,
  ...TaskStatusType[],
];
export const statusSchema = z.enum(statusEnum);

export const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => {
      return !value || !isNaN(Date.parse(value));
    },
    { message: 'Invalid date format. Please provide a valid date string' },
  );

export const taskIdSchema = z.string().trim().cuid();

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema.optional(),
  dueDate: dueDateSchema,
});

export const updateTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema.optional(),
  dueDate: dueDateSchema,
});

const filterStatusSchema = z
  .array(statusSchema, {
    message: `Invalid filter. Status must be ${statusEnum}`,
  })
  .optional();
const filterPrioritySchema = z
  .array(prioritySchema, {
    message: `Invalid filter. Priority must be ${priorityEnum}`,
  })
  .optional();
const filterAssignedToSchema = z.array(assignedToSchema).optional();

export const filterSchema = z.object({
  projectId: projectIdSchema.optional(),
  status: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return value.split(',') as TaskStatusType[];
    })
    .pipe(filterStatusSchema),
  priority: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return value.split(',') as TaskPriorityType[];
    })
    .pipe(filterPrioritySchema),
  assignedTo: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return value.split(',');
    })
    .pipe(filterAssignedToSchema),
  keyword: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return value.split(',');
    })
    .pipe(z.array(z.string().trim()).optional()),
  dueDate: z.string().optional(),
});

export type TaskFilterType = z.infer<typeof filterSchema>;
