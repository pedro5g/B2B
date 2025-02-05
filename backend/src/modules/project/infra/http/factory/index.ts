import { getMemberRoleInWorkspaceService } from '@/modules/member/infra/factory';
import {
  createProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectsAnalyticsService,
  getProjectsInWorkspaceService,
  updateProjectService,
} from '../../factory';
import { CreateProjectController } from '../controllers/create-project-controller';
import { UpdateProjectController } from '../controllers/update-project-controller';
import { DeleteProjectController } from '../controllers/delete-project-controller';
import { GetProjectsAnalyticsController } from '../controllers/get-project-analytics-controller';
import { GetProjectByIdController } from '../controllers/get-project-by-id-controller';
import { GetProjectsInWorkspaceController } from '../controllers/get-projects-in-workspace-controller';

const createProjectController = new CreateProjectController(
  createProjectService,
  getMemberRoleInWorkspaceService,
);
const updateProjectController = new UpdateProjectController(
  updateProjectService,
  getMemberRoleInWorkspaceService,
);
const deleteProjectController = new DeleteProjectController(
  deleteProjectService,
  getMemberRoleInWorkspaceService,
);
const getProjectsAnalyticsController = new GetProjectsAnalyticsController(
  getProjectsAnalyticsService,
  getMemberRoleInWorkspaceService,
);
const getProjectByIdController = new GetProjectByIdController(
  getProjectByIdService,
  getMemberRoleInWorkspaceService,
);
const getProjectsInWorkspaceController = new GetProjectsInWorkspaceController(
  getProjectsInWorkspaceService,
  getMemberRoleInWorkspaceService,
);

export {
  createProjectController,
  updateProjectController,
  deleteProjectController,
  getProjectsAnalyticsController,
  getProjectByIdController,
  getProjectsInWorkspaceController,
};
