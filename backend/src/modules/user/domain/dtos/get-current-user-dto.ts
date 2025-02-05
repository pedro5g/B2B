import { IUserWithoutPassword } from '../models/i-user';

export interface GetCurrentUserDTO {
  userId: string;
}

export interface GetCurrentUserReturnDTO {
  user: IUserWithoutPassword;
}
