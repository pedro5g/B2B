import {
  InternalServerException,
  NotFoundException,
} from '@/shared/exceptions';
import { IUserRepository } from '../domain/repository/i-user-repository';
import {
  GetCurrentUserServiceDTO,
  GetCurrentUserServiceReturnDTO,
} from './dtos/get-current-user-service-dto';
import { IWorkspaceRepository } from '@/modules/workspace/domain/repository/i-workspace-repository';

export class GetCurrentUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  public async execute({
    userId,
  }: GetCurrentUserServiceDTO): Promise<
    GetCurrentUserServiceReturnDTO | never
  > {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.currentWorkspace) {
      throw new InternalServerException(
        `Current workspace is null on user: ${user.id}`,
      );
    }

    const workspace = await this.workspaceRepository.findById(
      user.currentWorkspace,
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return {
      user: {
        ...user,
        currentWorkspace: {
          id: workspace.id,
          name: workspace.name,
          inviteCode: workspace.inviteCode,
          ownerId: workspace.ownerId,
        },
      },
    };
  }
}
