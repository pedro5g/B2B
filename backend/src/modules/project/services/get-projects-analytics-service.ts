import { NotFoundException } from '@/shared/exceptions';
import { IProjectRepository } from '../domain/repository/i-project-repository';
import { AnalyticsServiceDTO } from './dtos/analytics-service-dtos';

export class GetProjectsAnalyticsService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute({ projectId, workspaceId }: AnalyticsServiceDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      projectId,
      workspaceId,
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to this workspace',
      );
    }

    const analytics = await this.projectRepository.analytics({ projectId });

    return { analytics };
  }
}
