import { mockPatchingRouter } from '@/http/route';
import { joinWorkspaceController } from '../factory';
import { Router } from 'express';

const memberRoutes = mockPatchingRouter(Router());

memberRoutes.post(
  '/workspace/:inviteCode/join',
  joinWorkspaceController.handle,
);

export { memberRoutes };
