import { PrismaWorkspaceRepository } from '@/modules/workspace/infra/repository/prisma-workspace-repository';
import { PrismaProjectRepository } from '../repository/prisma-project-repository';
import { CreateProjectService } from '../../services/create-project-service';
import { PrismaUserRepository } from '@/modules/user/infra/repository/prisma-user-repository';
import { UpdateProjectService } from '../../services/update-project-service';
import { DeleteProjectService } from '../../services/delete-project-service';
import { GetProjectsAnalyticsService } from '../../services/get-projects-analytics-service';
import { GetProjectByIdService } from '../../services/get-project-by-id-service';
import { GetProjectsInWorkspaceService } from '../../services/get-projects-in-workspace-service';

const projectRepository = new PrismaProjectRepository();
const workspaceRepository = new PrismaWorkspaceRepository();
const userRepository = new PrismaUserRepository();

const createProjectService = new CreateProjectService(
  projectRepository,
  workspaceRepository,
  userRepository,
);
const updateProjectService = new UpdateProjectService(projectRepository);
const deleteProjectService = new DeleteProjectService(projectRepository);
const getProjectsAnalyticsService = new GetProjectsAnalyticsService(
  projectRepository,
);
const getProjectByIdService = new GetProjectByIdService(projectRepository);
const getProjectsInWorkspaceService = new GetProjectsInWorkspaceService(
  projectRepository,
);

export {
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getProjectsInWorkspaceService,
  getProjectByIdService,
  getProjectsAnalyticsService,
};
