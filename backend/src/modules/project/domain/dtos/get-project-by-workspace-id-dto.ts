export interface GetProjectByWorkspaceIdDTO {
  workspaceId: string;
  pageSize: number;
  pageNumber: number;
}

export interface GetProjectByWorkspaceIdReturnDTO {
  id: string;
  name: string;
  description: string | null;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: string;
    name: string;
    profilePictureUrl: string | null;
  };
}
