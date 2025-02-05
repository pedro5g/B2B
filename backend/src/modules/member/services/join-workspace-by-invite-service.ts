import { IWorkspaceRepository } from '@/modules/workspace/domain/repository/i-workspace-repository';
import { IMemberRepository } from '../domain/repository/i-member-repository';
import {
  JoinWorkspaceByInviteDTO,
  JoinWorkspaceByInviteReturnDTO,
} from './dtos/join-workspace-by-invite-dto';
import { BadRequestException, NotFoundException } from '@/shared/exceptions';
import { IRoleRepository } from '@/modules/role/domain/repository/i-role-repository';
import { Roles } from '@/shared/enums/roles';

export class JoinWorkspaceByInviteService {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute({
    userId,
    inviteCode,
  }: JoinWorkspaceByInviteDTO): Promise<JoinWorkspaceByInviteReturnDTO> {
    const workspace = await this.workspaceRepository.findByInviteCode(
      inviteCode,
    );

    if (!workspace) {
      throw new NotFoundException('Invalid invite code or workspace not found');
    }

    const isAlreadyMember = await this.memberRepository.findMember({
      userId,
      workspaceId: workspace.id,
    });

    if (isAlreadyMember) {
      throw new BadRequestException(
        'you are already a member of this workspace',
      );
    }

    const role = await this.roleRepository.findByName(Roles.MEMBER);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.memberRepository.create({
      userId,
      workspaceId: workspace.id,
      roleId: role.id,
    });

    return { workspaceId: workspace.id, role: role.name };
  }
}
