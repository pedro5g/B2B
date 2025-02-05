import { IWorkspace } from '../models/i-workspace';

export interface CreateWorkspaceDTO {
  name: string;
  description?: string | null;
  ownerId: string;
}

export interface CreateWorkspaceReturnDTO {
  workspace: IWorkspace;
}
