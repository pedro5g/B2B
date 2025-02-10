export interface IUserWithRole {
  workspaceId: string;
  user: {
    id: string;
    name: string;
    email: string | null;
    profilePictureUrl: string | null;
  };
  role: {
    id: string;
    name: string;
  };
  joinAt: Date | string;
}
