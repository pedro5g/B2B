import { RoleType } from '@/shared/enums/roles';

export interface GetMemberRoleInWorkspaceDTO {
  userId: string;
  workspaceId: string;
}

export interface GetMemberRoleInWorkspaceReturnDTO {
  role: RoleType;
}
