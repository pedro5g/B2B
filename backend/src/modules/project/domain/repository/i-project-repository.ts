import { Pagination } from '@/shared/interfaces/pagination';
import { AnalyticsDTO, AnalyticsReturnDTO } from '../dtos/analytics-dto';
import { CreateProjectDTO } from '../dtos/create-project-dto';
import { UpdateProjectDTO } from '../dtos/update-project-dto';
import { IProject } from '../models/i-project';
import {
  GetProjectByWorkspaceIdDTO,
  GetProjectByWorkspaceIdReturnDTO,
} from '../dtos/get-project-by-workspace-id-dto';
import { GetProjectReturnDTO } from '../dtos/get-project-dto';
import { GetProjectByIdAndWorkspaceIdDTO } from '../dtos/get-project-by-id-and-workspace-id-dto';

export interface IProjectRepository {
  create(createArgs: CreateProjectDTO): Promise<IProject>;
  update(updateArgs: UpdateProjectDTO): Promise<IProject>;
  delete(projectId: string): Promise<void>;
  analytics(analyticsArgs: AnalyticsDTO): Promise<AnalyticsReturnDTO>;
  getProjectByIdAndWorkspaceId(
    getArgs: GetProjectByIdAndWorkspaceIdDTO,
  ): Promise<GetProjectReturnDTO | null>;
  getProjectByWorkspaceId(
    getArgs: GetProjectByWorkspaceIdDTO,
  ): Promise<Pagination<GetProjectByWorkspaceIdReturnDTO>>;
}
