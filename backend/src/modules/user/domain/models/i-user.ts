export interface IUser {
  id: string;
  name: string;
  email: string | null;
  password: string | null;
  profilePictureUrl: string | null;
  isActive: boolean;
  currentWorkspace: string | null;
  lastLogin: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IUserWithoutPassword extends Omit<IUser, 'password'> {}
