import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import { IRoleRepository } from '@/modules/role/domain/repository/i-role-repository';
import {
  GetWorkspaceMembersServiceDTO,
  GetWorkspaceMembersServiceReturnDTO,
} from './dtos/get-workspace-members-dto';

export class GetWorkspaceMembersService {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetWorkspaceMembersServiceDTO): Promise<GetWorkspaceMembersServiceReturnDTO> {
    const members = await this.memberRepository.getUsersWithRoleById(
      workspaceId,
    );
    const roles = await this.roleRepository.findAll();

    const rolesWithoutPermissions = roles.map(({ permissions, ...rest }) => ({
      ...rest,
    }));

    return { members, roles: rolesWithoutPermissions };
  }
}
