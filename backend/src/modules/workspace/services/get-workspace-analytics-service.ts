import { NotFoundException } from '@/shared/exceptions';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import {
  GetWorkspaceAnalyticsServiceDTO,
  GetWorkspaceAnalyticsServiceReturnDTO,
} from './dtos/get-workspace-analytics-service';

export class GetWorkspaceAnalyticsService {
  constructor(private readonly workspaceRepository: IWorkspaceRepository) {}

  async execute({
    workspaceId,
  }: GetWorkspaceAnalyticsServiceDTO): Promise<GetWorkspaceAnalyticsServiceReturnDTO> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('workspace not found');
    }

    const analytics = await this.workspaceRepository.getWorkspaceAnalytics(
      workspaceId,
    );

    return {
      analytics,
    };
  }
}
