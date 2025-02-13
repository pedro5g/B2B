import { IMember } from '@/modules/member/domain/models/i-member';
import { CreateWorkspaceDTO } from '../dtos/create-workspace-dto';
import { DeleteWorkspaceDTO } from '../dtos/delete-workspace-dto';
import { UpdateWorkspaceDTO } from '../dtos/update-workspace-dto';
import { IWorkspace } from '../models/i-workspace';
import { WorkspaceAnalyticsDTO } from '../dtos/workspace-analytics-dto';

export interface IWorkspaceRepository {
  create(createArgs: CreateWorkspaceDTO): Promise<IWorkspace>;
  update(updateArgs: UpdateWorkspaceDTO): Promise<IWorkspace>;
  delete(deleteArgs: DeleteWorkspaceDTO): Promise<void>;
  getWorkspaceAnalytics(workspaceId: string): Promise<WorkspaceAnalyticsDTO>;
  findById(id: string): Promise<IWorkspace | null>;
  findByInviteCode(inviteCode: string): Promise<IWorkspace | null>;
  findWorkspacesByUserId(userId: string): Promise<IWorkspace[]>;
  findMemberByUserId(userId: string): Promise<IMember[]>;
}
