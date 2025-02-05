import { IWorkspaceRepository } from '@/modules/workspace/domain/repository/i-workspace-repository';
import { CreateProjectDTO } from '../domain/dtos/create-project-dto';
import { IProjectRepository } from '../domain/repository/i-project-repository';
import { IUserRepository } from '@/modules/user/domain/repository/i-user-repository';
import { NotFoundException } from '@/shared/exceptions';

export class CreateProjectService {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    workspaceId,
    name,
    description,
    emoji,
  }: CreateProjectDTO) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found or invalid user id');
    }

    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException(
        'Workspace not found or invalid workspace id',
      );
    }

    const project = await this.projectRepository.create({
      userId,
      workspaceId,
      name,
      description,
      emoji,
    });

    return { project };
  }
}
