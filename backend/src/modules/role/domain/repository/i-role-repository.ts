import { CreateRoleDTO } from '../dtos/create-role-dto';
import { IRole } from '../models/i-role';

export interface IRoleRepository {
  create(createArgs: CreateRoleDTO): Promise<IRole>;
  delete(roleId: string): Promise<void>;
  findById(roleId: string): Promise<IRole | null>;
  findByName(name: string): Promise<IRole | null>;
  findAll(): Promise<IRole[]>;
}
