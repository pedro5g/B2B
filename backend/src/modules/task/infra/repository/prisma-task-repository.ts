import { prisma } from '@/shared/lib/prisma';
import { CreateTaskDTO } from '../../domain/dtos/create-task-dto';
import { ITask } from '../../domain/models/i-task';
import { ITaskRepository } from '../../domain/repository/i-task-repository';
import { generateTaskCode } from '@/shared/utils/uuid';
import { UpdateTaskDTO } from '../../domain/dtos/update-task-dto';
import { Pagination } from '@/shared/interfaces/pagination';
import { GetAllTasksDTO } from '../../domain/dtos/get-all-tasks-dto';
import { Prisma } from '@prisma/client';
import { FindByIdAndWorkspaceIdDTO } from '../../domain/dtos/find-by-id-and-workspace-id-dto';
import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';
import { ITaskWithAssigned } from '../../domain/models/i-task-with-assigned';

export class PrismaTaskRepository implements ITaskRepository {
  async create({
    projectId,
    workspaceId,
    title,
    description,
    priority,
    status,
    assignedTo,
    dueDate,
    authorId,
  }: CreateTaskDTO): Promise<ITask> {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        taskCode: generateTaskCode(),
        workspaceId,
        projectId,
        dueDate,
        assignedId: assignedTo,
        authorId,
      },
    });

    return task;
  }

  async update({
    title,
    description,
    priority,
    assignedTo,
    status,
    dueDate,
    taskId,
  }: UpdateTaskDTO): Promise<ITask> {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        status,
        priority,
        assignedId: assignedTo,
        dueDate,
      },
    });

    return updatedTask;
  }

  async delete(taskId: string): Promise<void> {
    await prisma.task.delete({ where: { id: taskId } });
  }

  async getAllTasks({
    workspaceId,
    projectId,
    assignedTo,
    dueDate,
    keyword,
    priority,
    status,
    pageNumber,
    pageSize,
  }: GetAllTasksDTO): Promise<Pagination<ITaskWithAssigned>> {
    const query = this.buildTaskQuery({
      workspaceId,
      projectId,
      assignedTo,
      dueDate,
      keyword,
      priority,
      status,
    });

    const skip = (pageNumber - 1) * pageSize;
    const [totalCount, tasks] = await Promise.all([
      prisma.task.count(query as Prisma.TaskCountArgs),
      prisma.task.findMany({
        ...query,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          taskCode: true,
          authorId: true,
          workspaceId: true,
          projectId: true,
          createdAt: true,
          updatedAt: true,
          dueDate: true,
          project: {
            select: {
              id: true,
              name: true,
              emoji: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              profilePictureUrl: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      items: tasks,
      totalPage: totalPages,
      totalCount,
      skip,
    };
  }

  async findByIdAndWorkspaceId({
    taskId,
    workspaceId,
  }: FindByIdAndWorkspaceIdDTO): Promise<ITaskWithAssigned | null> {
    const task = await prisma.task.findUnique({
      where: { id: taskId, AND: { workspaceId } },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        taskCode: true,
        authorId: true,
        workspaceId: true,
        projectId: true,
        createdAt: true,
        updatedAt: true,
        dueDate: true,
        project: {
          select: {
            id: true,
            name: true,
            emoji: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            profilePictureUrl: true,
          },
        },
      },
    });

    return task;
  }

  async getById(taskId: string): Promise<ITask | null> {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    return task;
  }

  private buildTaskQuery({
    workspaceId,
    projectId,
    keyword,
    status,
    priority,
    assignedTo,
    dueDate,
  }: Omit<GetAllTasksDTO, 'pageNumber' | 'pageSize'>):
    | Prisma.TaskFindManyArgs
    | Prisma.TaskCountArgs {
    const filters: Prisma.TaskWhereInput[] = [{ workspaceId }];

    if (projectId) filters.push({ projectId });

    if (keyword) {
      filters.push({
        OR: [
          { title: { in: keyword, mode: 'insensitive' } },
          { description: { in: keyword, mode: 'insensitive' } },
        ],
      });
    }

    if (status) filters.push({ status: { in: status } });
    if (priority) filters.push({ priority: { in: priority } });
    if (assignedTo) filters.push({ assignedId: { in: assignedTo } });
    if (dueDate) filters.push({ dueDate });

    return {
      where: filters.length > 1 ? { AND: filters } : filters[0],
    };
  }
}
