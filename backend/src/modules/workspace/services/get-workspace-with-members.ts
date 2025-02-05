import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import {
  GetWorkspaceWithMembersDTO,
  GetWorkspaceWithMembersReturnDTO,
} from '../domain/dtos/get-workspace-with-members-dto';
import { NotFoundException } from '@/shared/exceptions';

export class GetWorkspaceWithMembersService {
  constructor(
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetWorkspaceWithMembersDTO): Promise<GetWorkspaceWithMembersReturnDTO> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const members = await this.memberRepository.findMembersByWorkspaceId(
      workspaceId,
    );

    return {
      workspace,
      members,
    };
  }
}
