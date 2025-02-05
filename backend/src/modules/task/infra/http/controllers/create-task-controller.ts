import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { CreateTaskService } from '@/modules/task/services/create-task-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { projectIdSchema } from '@/shared/validators/project-validators';
import { createTaskSchema } from '@/shared/validators/task-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class CreateTaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const projectId = projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const { title, description, priority, status, assignedTo, dueDate } =
      createTaskSchema.parse(req.body);

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.CREATE_TASK]);

    const { task } = await this.createTaskService.execute({
      userId,
      workspaceId,
      projectId,
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Task created successfully',
      task,
    });
  });
}
