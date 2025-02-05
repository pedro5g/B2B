import { IUserRepository } from '@/modules/user/domain/repository/i-user-repository';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import { NotFoundException } from '@/shared/exceptions';

export class GetAllWorkspacesUserIsMemberService {
  constructor(
    private workspaceRepository: IWorkspaceRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const memberships = await this.workspaceRepository.findMemberByUserId(
      userId,
    );

    const workspaceInfos = memberships.map(
      (workspace) => workspace.workspaceId,
    );
    const { password, ...withoutPassword } = user;

    return {
      workspaces: {
        ...withoutPassword,
        workspaces: workspaceInfos,
      },
    };
  }
}
