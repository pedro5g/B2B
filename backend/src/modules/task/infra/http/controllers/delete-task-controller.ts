import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { DeleteTaskService } from '@/modules/task/services/delete-task-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { taskIdSchema } from '@/shared/validators/task-validators';

import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class DeleteTaskController {
  constructor(
    private readonly deleteTaskService: DeleteTaskService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const taskId = taskIdSchema.parse(req.params.taskId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.DELETE_TASK]);

    await this.deleteTaskService.execute({
      taskId,
      workspaceId,
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Task deleted successfully',
    });
  });
}
