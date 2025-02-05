export interface CreateProjectDTO {
  userId: string;
  workspaceId: string;
  name: string;
  description?: string;
  emoji?: string;
}
