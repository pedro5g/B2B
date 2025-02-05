import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import { NotFoundException } from '@/shared/exceptions';

export class GetWorkspaceService {
  constructor(
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(workspaceId: string) {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const members = await this.memberRepository.findMembersByWorkspaceId(
      workspaceId,
    );

    return { workspace: { workspace, members } };
  }
}
