import { Router } from 'express';
import {
  createProjectController,
  updateProjectController,
  deleteProjectController,
  getProjectsInWorkspaceController,
  getProjectsAnalyticsController,
  getProjectByIdController,
} from '../factory';

const projectRoutes = Router();

projectRoutes.post(
  '/workspace/:workspaceId/create',
  createProjectController.handle,
);
projectRoutes.put(
  '/:projectId/workspace/:workspaceId/update',
  updateProjectController.handle,
);
projectRoutes.delete(
  '/:projectId/workspace/:workspaceId/delete',
  deleteProjectController.handle,
);
projectRoutes.get(
  '/workspace/:workspaceId/all',
  getProjectsInWorkspaceController.handle,
);
projectRoutes.get(
  '/:projectId/workspace/:workspaceId/analytics',
  getProjectsAnalyticsController.handle,
);
projectRoutes.get(
  '/:projectId/workspace/:workspaceId',
  getProjectByIdController.handle,
);

export { projectRoutes };
