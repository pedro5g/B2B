import { PrismaWorkspaceRepository } from '@/modules/workspace/infra/repository/prisma-workspace-repository';
import { PrismaMemberRepository } from '../repository/prisma-member-repository';
import { GetMemberRoleInWorkspaceService } from '../../services/get-member-role-in-workspace-service';
import { JoinWorkspaceByInviteService } from '../../services/join-workspace-by-invite-service';
import { PrismaRoleRepository } from '@/modules/role/infra/repository/prisma-role-repository';

const memberRepository = new PrismaMemberRepository();
const workspaceRepository = new PrismaWorkspaceRepository();
const roleRepository = new PrismaRoleRepository();

const getMemberRoleInWorkspaceService = new GetMemberRoleInWorkspaceService(
  memberRepository,
  workspaceRepository,
);
const joinWorkspaceByInviteService = new JoinWorkspaceByInviteService(
  memberRepository,
  workspaceRepository,
  roleRepository,
);

export { getMemberRoleInWorkspaceService, joinWorkspaceByInviteService };
