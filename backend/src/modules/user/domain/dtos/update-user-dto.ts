export interface UpdateUserDTO {
  id: string;
  name: string;
  profilePictureUrl?: string | null;
  isActive: boolean;
  currentWorkspace?: string;
  lastLogin: Date | string | null;
}
