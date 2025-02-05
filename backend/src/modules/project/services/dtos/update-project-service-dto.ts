export interface UpdateProjectServiceDTO {
  projectId: string;
  workspaceId: string;
  name: string;
  description?: string;
  emoji?: string;
}
