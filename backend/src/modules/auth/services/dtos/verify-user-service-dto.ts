import { IUserWithWorkspace } from '@/modules/user/domain/models/i-user-with-workspace';

export interface VerifyUserServiceDTO {
  email: string;
  password: string;
}

export interface VerifyUserServiceReturnDTO {
  user: IUserWithWorkspace;
}
