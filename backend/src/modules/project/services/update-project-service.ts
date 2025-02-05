import { NotFoundException } from '@/shared/exceptions';
import { IProjectRepository } from '../domain/repository/i-project-repository';
import { UpdateProjectServiceDTO } from './dtos/update-project-service-dto';

export class UpdateProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute({
    projectId,
    workspaceId,
    name,
    description,
    emoji,
  }: UpdateProjectServiceDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      projectId,
      workspaceId,
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to the specified workspace',
      );
    }

    const updatedProject = await this.projectRepository.update({
      projectId,
      name,
      description,
      emoji,
    });

    return { project: updatedProject };
  }
}
