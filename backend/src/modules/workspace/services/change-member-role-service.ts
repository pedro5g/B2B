import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import {
  ChangeMemberRoleDTO,
  ChangeMemberRoleReturnDTO,
} from '../domain/dtos/change-member-role.dto';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import { IRoleRepository } from '@/modules/role/domain/repository/i-role-repository';
import { NotFoundException } from '@/shared/exceptions';

export class ChangeMemberRoleService {
  constructor(
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly memberRepository: IMemberRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute({
    workspaceId,
    memberId,
    roleId,
  }: ChangeMemberRoleDTO): Promise<ChangeMemberRoleReturnDTO> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const role = await this.roleRepository.findById(roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const member = await this.memberRepository.findMember({
      workspaceId,
      userId: memberId,
    });

    if (!member) {
      throw new NotFoundException('Member not found in the workspace');
    }

    const updatedMember = await this.memberRepository.update({
      workspaceId,
      userId: memberId,
      roleId,
    });

    return { member: updatedMember };
  }
}
