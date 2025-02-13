import { Router } from 'express';
import {
  changeWorkspaceMemberRoleController,
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceUserIsMemberController,
  getWorkspaceAnalyticsController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
  updateWorkspaceController,
} from '../factory';
import { mockPatchingRouter } from '@/http/route';

const workspaceRoutes = mockPatchingRouter(Router());

workspaceRoutes.post('/create/new', createWorkspaceController.handle);
workspaceRoutes.put('/update/:id', updateWorkspaceController.handle);
workspaceRoutes.put(
  '/change/member/:id',
  changeWorkspaceMemberRoleController.handle,
);
workspaceRoutes.get('/analytics/:id', getWorkspaceAnalyticsController.handle);
workspaceRoutes.delete('/delete/:id', deleteWorkspaceController.handle);
workspaceRoutes.get('/all', getAllWorkspaceUserIsMemberController.handle);
workspaceRoutes.get('/members/:id', getWorkspaceMembersController.handle);
workspaceRoutes.get('/:id', getWorkspaceByIdController.handle);

export { workspaceRoutes };
