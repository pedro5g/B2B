export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  inviteCode: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
