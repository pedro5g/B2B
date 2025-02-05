import { NotFoundException } from '@/shared/exceptions';
import { IProjectRepository } from '../domain/repository/i-project-repository';
import { DeleteProjectServiceDTO } from './dtos/delete-project-service-dto';

export class DeleteProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute({ projectId, workspaceId }: DeleteProjectServiceDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      projectId,
      workspaceId,
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to the specified workspace',
      );
    }

    await this.projectRepository.delete(projectId);

    return { project: project };
  }
}
