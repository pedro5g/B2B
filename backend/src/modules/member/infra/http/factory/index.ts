import { joinWorkspaceByInviteService } from '../../factory';
import { JoinWorkspaceController } from '../controllers/join-workspace-controller';

const joinWorkspaceController = new JoinWorkspaceController(
  joinWorkspaceByInviteService,
);

export { joinWorkspaceController };
