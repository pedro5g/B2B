import { prisma } from '@/shared/lib/prisma';
import { CreateProjectDTO } from '../../domain/dtos/create-project-dto';
import { IProject } from '../../domain/models/i-project';
import { IProjectRepository } from '../../domain/repository/i-project-repository';
import { UpdateProjectDTO } from '../../domain/dtos/update-project-dto';
import {
  AnalyticsDTO,
  AnalyticsReturnDTO,
} from '../../domain/dtos/analytics-dto';
import { TaskStatusEnum } from '@/shared/enums/task';
import { GetProjectReturnDTO } from '../../domain/dtos/get-project-dto';
import { Pagination } from '@/shared/interfaces/pagination';
import {
  GetProjectByWorkspaceIdDTO,
  GetProjectByWorkspaceIdReturnDTO,
} from '../../domain/dtos/get-project-by-workspace-id-dto';
import { GetProjectByIdAndWorkspaceIdDTO } from '../../domain/dtos/get-project-by-id-and-workspace-id-dto';

export class PrismaProjectRepository implements IProjectRepository {
  async create({
    userId,
    workspaceId,
    name,
    description,
    emoji,
  }: CreateProjectDTO): Promise<IProject> {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        emoji,
        workspaceId,
        creatorId: userId,
      },
    });

    return project;
  }

  async update({
    projectId,
    name,
    description,
    emoji,
  }: UpdateProjectDTO): Promise<IProject> {
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        description,
        emoji,
      },
    });

    return updatedProject;
  }

  async delete(projectId: string): Promise<void> {
    await prisma.$transaction(async (trx) => {
      await trx.task.deleteMany({ where: { projectId } });
      await trx.project.delete({
        where: { id: projectId },
      });
    });
  }

  async analytics({ projectId }: AnalyticsDTO): Promise<AnalyticsReturnDTO> {
    const [totalTasks, overdueTasks, completedTasks] = await Promise.all([
      prisma.task.count({
        where: { projectId },
      }),
      prisma.task.count({
        where: {
          projectId,
          dueDate: { lt: new Date() },
          status: { not: TaskStatusEnum.DONE },
        },
      }),
      prisma.task.count({
        where: {
          projectId,
          status: TaskStatusEnum.DONE,
        },
      }),
    ]);

    return {
      totalTasks,
      overdueTasks,
      completedTasks,
    };
  }

  async getProjectByIdAndWorkspaceId({
    projectId,
    workspaceId,
  }: GetProjectByIdAndWorkspaceIdDTO): Promise<GetProjectReturnDTO | null> {
    const project = await prisma.project.findUnique({
      where: { id: projectId, AND: { workspaceId } },
      select: {
        id: true,
        emoji: true,
        name: true,
        description: true,
      },
    });

    return project;
  }

  async getProjectByWorkspaceId({
    workspaceId,
    pageNumber,
    pageSize,
  }: GetProjectByWorkspaceIdDTO): Promise<
    Pagination<GetProjectByWorkspaceIdReturnDTO>
  > {
    const skip = (pageNumber - 1) * pageSize;

    const [totalCount, items] = await Promise.all([
      prisma.project.count({ where: { workspaceId } }),
      prisma.project.findMany({
        where: { workspaceId },
        select: {
          id: true,
          name: true,
          description: true,
          emoji: true,
          createdAt: true,
          updatedAt: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              profilePictureUrl: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalPage = Math.ceil(totalCount / pageSize);

    return {
      items,
      totalCount,
      totalPage,
      skip,
    };
  }
}
