import { GetProjectByWorkspaceIdDTO } from '../domain/dtos/get-project-by-workspace-id-dto';
import { IProjectRepository } from '../domain/repository/i-project-repository';

export class GetProjectsInWorkspaceService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute({
    workspaceId,
    pageSize,
    pageNumber,
  }: GetProjectByWorkspaceIdDTO) {
    const { items, skip, totalCount, totalPage } =
      await this.projectRepository.getProjectByWorkspaceId({
        workspaceId,
        pageSize,
        pageNumber,
      });

    return {
      projects: items,
      metadata: {
        totalPage,
        totalCount,
        skip,
      },
    };
  }
}
