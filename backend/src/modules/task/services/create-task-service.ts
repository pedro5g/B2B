import { IProjectRepository } from '@/modules/project/domain/repository/i-project-repository';
import { ITaskRepository } from '../domain/repository/i-task-repository';
import { CreateTaskServiceDTO } from './dtos/create-task-service-dto';
import { IMemberRepository } from '@/modules/member/domain/repository/i-member-repository';
import { BadRequestException, NotFoundException } from '@/shared/exceptions';
import { TaskPriorityEnum, TaskStatusEnum } from '@/shared/enums/task';

export class CreateTaskService {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({
    userId,
    workspaceId,
    projectId,
    title,
    description,
    priority,
    status,
    assignedTo,
    dueDate,
  }: CreateTaskServiceDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      projectId,
      workspaceId,
    });

    if (!project) {
      throw new NotFoundException(
        'project not found or does not belong to this workspace',
      );
    }

    if (assignedTo) {
      const isAssignedUserMember = await this.memberRepository.findMember({
        userId: assignedTo,
        workspaceId,
      });

      if (!isAssignedUserMember) {
        throw new BadRequestException(
          'Assigned user is not a member of this repository',
        );
      }
    }

    const task = await this.taskRepository.create({
      title,
      description,
      priority: priority || TaskPriorityEnum.MEDIUM,
      status: status || TaskStatusEnum.TODO,
      assignedTo,
      workspaceId,
      projectId,
      dueDate,
      authorId: userId,
    });

    return { task };
  }
}
