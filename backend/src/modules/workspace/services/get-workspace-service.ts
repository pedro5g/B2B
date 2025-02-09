import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import { NotFoundException } from '@/shared/exceptions';
import {
  GetWorkspaceServiceDTO,
  GetWorkspaceServiceReturnDTO,
} from './dtos/get-workspace-service-dto';

export class GetWorkspaceService {
  constructor(
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetWorkspaceServiceDTO): Promise<GetWorkspaceServiceReturnDTO> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const members = await this.memberRepository.findMembersByWorkspaceId(
      workspaceId,
    );

    return {
      workspace: {
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        inviteCode: workspace.inviteCode,
        ownerId: workspace.ownerId,
        members: members,
      },
    };
  }
}
