import { NotFoundException } from '@/shared/exceptions';
import { IProjectRepository } from '../domain/repository/i-project-repository';
import { GetProjectByIdAndWorkspaceIdDTO } from '../domain/dtos/get-project-by-id-and-workspace-id-dto';

export class GetProjectByIdService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute({ projectId, workspaceId }: GetProjectByIdAndWorkspaceIdDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      projectId,
      workspaceId,
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to the specified workspace',
      );
    }

    return { project };
  }
}
