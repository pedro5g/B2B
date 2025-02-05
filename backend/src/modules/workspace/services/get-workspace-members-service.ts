import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import { IRoleRepository } from '@/modules/role/domain/repository/i-role-repository';

export class GetWorkspaceMembersService {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(workspaceId: string) {
    const members = await this.memberRepository.getUsersWithRoleById(
      workspaceId,
    );

    const usersFormatted = members.map((member) => {
      const { user, role } = member;

      return { ...user, role: { name: role.name } };
    });

    const roles = await this.roleRepository.findAll();

    const rolesWithoutPermissions = roles.map(({ permissions, ...rest }) => ({
      ...rest,
    }));

    return { members: usersFormatted, roles: rolesWithoutPermissions };
  }
}
