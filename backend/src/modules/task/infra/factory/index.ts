import { PrismaProjectRepository } from '@/modules/project/infra/repository/prisma-project-repository';
import { CreateTaskService } from '../../services/create-task-service';
import { PrismaTaskRepository } from '../repository/prisma-task-repository';
import { PrismaMemberRepository } from '@/modules/member/infra/repository/prisma-member-repository';
import { UpdateTaskService } from '../../services/update-task-service';
import { DeleteTaskService } from '../../services/delete-task-service';
import { GetAllTasksService } from '../../services/get-all-tasks-service';
import { GetTaskByIdService } from '../../services/get-task-by-id-service';
import { PrismaUserRepository } from '@/modules/user/infra/repository/prisma-user-repository';

const taskRepository = new PrismaTaskRepository();
const projectRepository = new PrismaProjectRepository();
const userRepository = new PrismaUserRepository();
const memberRepository = new PrismaMemberRepository();

const createTaskService = new CreateTaskService(
  taskRepository,
  projectRepository,
  memberRepository,
);
const updateTaskService = new UpdateTaskService(
  taskRepository,
  projectRepository,
);
const deleteTaskService = new DeleteTaskService(taskRepository);
const getTaskByIdService = new GetTaskByIdService(
  taskRepository,
  projectRepository,
  userRepository,
);
const getAllTasksService = new GetAllTasksService(taskRepository);

export {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getTaskByIdService,
  getAllTasksService,
};
