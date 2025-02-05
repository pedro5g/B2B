import { IWorkspace } from '../models/i-workspace';

export interface UpdateWorkspaceDTO {
  workspaceId: string;
  name: string;
  description?: string;
}

export interface UpdateWorkspaceReturnDTO {
  workspace: IWorkspace;
}
