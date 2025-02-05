import { IMember } from '@/modules/member/domain/models/i-member';

export interface ChangeMemberRoleDTO {
  workspaceId: string;
  memberId: string;
  roleId: string;
}

export interface ChangeMemberRoleReturnDTO {
  member: IMember;
}
