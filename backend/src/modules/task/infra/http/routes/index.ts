import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from '../factory';

const taskRoutes = Router();

taskRoutes.post(
  '/project/:projectId/workspace/:workspaceId/create',
  createTaskController.handle,
);

taskRoutes.delete(
  '/:taskId/workspace/:workspaceId/delete',
  deleteTaskController.handle,
);

taskRoutes.put(
  '/:taskId/project/:projectId/workspace/:workspaceId/update',
  updateTaskController.handle,
);

taskRoutes.get('/workspace/:workspaceId/all', getAllTasksController.handle);

taskRoutes.get(
  '/:taskId/project/:projectId/workspace/:workspaceId',
  getTaskByIdController.handle,
);

export { taskRoutes };
