import {
  IMember,
  IMemberWithRole,
} from '@/modules/member/domain/models/i-member';
import { IWorkspace } from '../models/i-workspace';

export interface GetWorkspaceWithMembersDTO {
  workspaceId: string;
}

export interface GetWorkspaceWithMembersReturnDTO {
  workspace: IWorkspace;
  members: IMemberWithRole[];
}
