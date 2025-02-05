import { getMemberRoleInWorkspaceService } from '@/modules/member/infra/factory';
import {
  changeMemberRoleService,
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorkspacesUserIsMemberService,
  getWorkspaceMembersService,
  getWorkspaceService,
  updateWorkspaceService,
} from '../../factory';
import { CreateWorkspaceController } from '../controllers/create-workspace-controller';
import { UpdateWorkspaceController } from '../controllers/update-workspace-controller';
import { DeleteWorkspaceController } from '../controllers/delete-workspace-controller';
import { ChangeWorkspaceMemberRoleController } from '../controllers/change-workspace-member-role-controller';
import { GetAllWorkspacesUserIsMemberController } from '../controllers/get-all-workspaces-user-is-member-controller';
import { GetWorkspaceByIdController } from '../controllers/get-workspace-by-id-controller';
import { GetWorkspaceMembersController } from '../controllers/get-workspace-members-controller';

const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceService,
);
const updateWorkspaceController = new UpdateWorkspaceController(
  updateWorkspaceService,
  getMemberRoleInWorkspaceService,
);
const deleteWorkspaceController = new DeleteWorkspaceController(
  deleteWorkspaceService,
  getMemberRoleInWorkspaceService,
);
const changeWorkspaceMemberRoleController =
  new ChangeWorkspaceMemberRoleController(
    changeMemberRoleService,
    getMemberRoleInWorkspaceService,
  );
const getAllWorkspaceUserIsMemberController =
  new GetAllWorkspacesUserIsMemberController(
    getAllWorkspacesUserIsMemberService,
  );
const getWorkspaceByIdController = new GetWorkspaceByIdController(
  getWorkspaceService,
  getMemberRoleInWorkspaceService,
);
const getWorkspaceMembersController = new GetWorkspaceMembersController(
  getWorkspaceMembersService,
  getMemberRoleInWorkspaceService,
);

export {
  createWorkspaceController,
  updateWorkspaceController,
  deleteWorkspaceController,
  changeWorkspaceMemberRoleController,
  getAllWorkspaceUserIsMemberController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
};
