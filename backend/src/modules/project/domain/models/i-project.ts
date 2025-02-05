export interface IProject {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  creatorId: string;
  workspaceId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
