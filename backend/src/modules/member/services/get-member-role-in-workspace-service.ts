import { IWorkspaceRepository } from '@/modules/workspace/domain/repository/i-workspace-repository';
import { IMemberRepository } from '../domain/repository/i-member-repository';
import {
  GetMemberRoleInWorkspaceDTO,
  GetMemberRoleInWorkspaceReturnDTO,
} from './dtos/get-member-role-in-workspace-dto';
import { NotFoundException, UnauthorizedException } from '@/shared/exceptions';
import { ErrorCode } from '@/shared/enums/error-code';

export class GetMemberRoleInWorkspaceService {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute({
    userId,
    workspaceId,
  }: GetMemberRoleInWorkspaceDTO): Promise<GetMemberRoleInWorkspaceReturnDTO> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('workspace not found');
    }

    const member = await this.memberRepository.findMember({
      userId,
      workspaceId,
    });

    if (!member) {
      throw new UnauthorizedException(
        'You are not a member of this workspace',
        ErrorCode.ACCESS_UNAUTHORIZED,
      );
    }

    return { role: member.role.name };
  }
}
