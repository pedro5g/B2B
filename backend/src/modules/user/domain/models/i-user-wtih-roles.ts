import { IUserWithoutPassword } from './i-user';

export interface IUserWithRole {
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
}
