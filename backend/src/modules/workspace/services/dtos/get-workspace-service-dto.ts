import { IMemberWithRole } from '@/modules/member/domain/models/i-member';

export interface GetWorkspaceServiceDTO {
  workspaceId: string;
}

export interface GetWorkspaceServiceReturnDTO {
  workspace: {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    inviteCode: string;
    members: IMemberWithRole[];
  };
}
