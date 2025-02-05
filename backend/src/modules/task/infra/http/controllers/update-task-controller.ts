import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { UpdateTaskService } from '@/modules/task/services/update-task-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { projectIdSchema } from '@/shared/validators/project-validators';
import {
  taskIdSchema,
  updateTaskSchema,
} from '@/shared/validators/task-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class UpdateTaskController {
  constructor(
    private readonly updateTaskService: UpdateTaskService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const taskId = taskIdSchema.parse(req.params.taskId);
    const projectId = projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const { title, description, priority, status, assignedTo, dueDate } =
      updateTaskSchema.parse(req.body);

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.EDIT_TASK]);

    const { updatedTask } = await this.updateTaskService.execute({
      taskId,
      workspaceId,
      projectId,
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  });
}
