export interface JoinWorkspaceByInviteDTO {
  userId: string;
  inviteCode: string;
}

export interface JoinWorkspaceByInviteReturnDTO {
  workspaceId: string;
  role: string;
}
