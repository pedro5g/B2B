import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { IUser } from '../models/i-user';
import { IUserPresenter } from '../models/i-user-presenter';
import { IUserWithRole } from '../models/i-user-with-roles';

export interface IUserRepository {
  create(createArgs: CreateUserDTO): Promise<{ userId: string }>;
  update(updateArgs: UpdateUserDTO): Promise<void>;
  findById(id: string): Promise<IUserPresenter | null>;
  findManyByIds(ids: string[]): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  findUserByWorkspaceId(workspaceId: string): Promise<IUser[]>;
}
