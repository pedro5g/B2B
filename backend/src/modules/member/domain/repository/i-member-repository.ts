import { IUserWithRole } from '@/modules/user/domain/models/i-user-wtih-roles';
import { CreateMemberDTO } from '../dtos/create-member-dto';
import { FindMemberDTO } from '../dtos/find-member-dto';
import { UpdateMemberDTO } from '../dtos/update-member-dto';
import { IMember, IMemberWithRole } from '../models/i-member';

export interface IMemberRepository {
  create(createArgs: CreateMemberDTO): Promise<IMember>;
  update(updateArgs: UpdateMemberDTO): Promise<IMember>;
  findMember(findArgs: FindMemberDTO): Promise<IMemberWithRole | null>;
  getUsersWithRoleById(workspaceId: string): Promise<IUserWithRole[]>;
  findMembersByWorkspaceId(workspaceId: string): Promise<IMemberWithRole[]>;
}
