import { mockPatchingRouter } from '@/http/route';
import {
  createProjectController,
  updateProjectController,
  deleteProjectController,
  getProjectsInWorkspaceController,
  getProjectsAnalyticsController,
  getProjectByIdController,
} from '../factory';
import { Router } from 'express';

const projectRoutes = mockPatchingRouter(Router());

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
