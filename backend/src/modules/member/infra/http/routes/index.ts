import { Router } from 'express';
import { joinWorkspaceController } from '../factory';

const memberRoutes = Router();

memberRoutes.post(
  '/workspace/:inviteCode/join',
  joinWorkspaceController.handle,
);

export { memberRoutes };
