import { getMemberRoleInWorkspaceService } from '@/modules/member/infra/factory';
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from '../../factory';
import { CreateTaskController } from '../controllers/create-task-controller';
import { UpdateTaskController } from '../controllers/update-task-controller';
import { DeleteProjectController } from '@/modules/project/infra/http/controllers/delete-project-controller';
import { deleteProjectService } from '@/modules/project/infra/factory';
import { GetTaskByIdController } from '../controllers/get-task-by-id-controller';
import { GetAllTasksController } from '../controllers/get-all-tasks-controller';
import { DeleteTaskController } from '../controllers/delete-task-controller';

const createTaskController = new CreateTaskController(
  createTaskService,
  getMemberRoleInWorkspaceService,
);
const updateTaskController = new UpdateTaskController(
  updateTaskService,
  getMemberRoleInWorkspaceService,
);
const deleteTaskController = new DeleteTaskController(
  deleteTaskService,
  getMemberRoleInWorkspaceService,
);
const getTaskByIdController = new GetTaskByIdController(
  getTaskByIdService,
  getMemberRoleInWorkspaceService,
);
const getAllTasksController = new GetAllTasksController(
  getAllTasksService,
  getMemberRoleInWorkspaceService,
);

export {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  getAllTasksController,
};
