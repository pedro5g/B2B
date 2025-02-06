import { IUserWithWorkspace } from '../../domain/models/i-user-with-workspace';

export interface GetCurrentUserServiceDTO {
  userId: string;
}

export interface GetCurrentUserServiceReturnDTO {
  user: IUserWithWorkspace;
}
