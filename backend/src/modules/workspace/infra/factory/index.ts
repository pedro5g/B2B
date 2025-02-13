import { PrismaUserRepository } from '@/modules/user/infra/repository/prisma-user-repository';
import { PrismaWorkspaceRepository } from '../repository/prisma-workspace-repository';
import { CreateWorkspaceService } from '../../services/create-workspace-service';
import { UpdateWorkspaceService } from '../../services/update-workspace-service';
import { DeleteWorkspaceService } from '../../services/delete-workspace-service';
import { PrismaRoleRepository } from '@/modules/role/infra/repository/prisma-role-repository';
import { ChangeMemberRoleService } from '../../services/change-member-role-service';
import { PrismaMemberRepository } from '@/modules/member/infra/repository/prisma-member-repository';
import { GetWorkspaceWithMembersService } from '../../services/get-workspace-with-members';
import { GetWorkspaceService } from '../../services/get-workspace-service';
import { GetWorkspaceMembersService } from '../../services/get-workspace-members-service';
import { GetAllWorkspacesUserIsMemberService } from '../../services/get-all-workspaces-user-is-member-service';
import { GetWorkspaceAnalyticsService } from '../../services/get-workspace-analytics-service';

// repositories
const workspaceRepository = new PrismaWorkspaceRepository();
const roleRepository = new PrismaRoleRepository();
const memberRepository = new PrismaMemberRepository();
const userRepository = new PrismaUserRepository();

// services
const createWorkspaceService = new CreateWorkspaceService(workspaceRepository);
const updateWorkspaceService = new UpdateWorkspaceService(workspaceRepository);
const deleteWorkspaceService = new DeleteWorkspaceService(
  workspaceRepository,
  userRepository,
);
const getWorkspaceAnalyticsService = new GetWorkspaceAnalyticsService(
  workspaceRepository,
);
const changeMemberRoleService = new ChangeMemberRoleService(
  workspaceRepository,
  memberRepository,
  roleRepository,
);
const getWorkspaceWithMembers = new GetWorkspaceWithMembersService(
  workspaceRepository,
  memberRepository,
);
const getWorkspaceService = new GetWorkspaceService(
  workspaceRepository,
  memberRepository,
);
const getWorkspaceMembersService = new GetWorkspaceMembersService(
  memberRepository,
  roleRepository,
);
const getAllWorkspacesUserIsMemberService =
  new GetAllWorkspacesUserIsMemberService(workspaceRepository, userRepository);

export {
  createWorkspaceService,
  updateWorkspaceService,
  deleteWorkspaceService,
  changeMemberRoleService,
  getWorkspaceWithMembers,
  getWorkspaceService,
  getWorkspaceMembersService,
  getAllWorkspacesUserIsMemberService,
  getWorkspaceAnalyticsService,
};
