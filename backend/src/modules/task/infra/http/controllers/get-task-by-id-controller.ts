import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { GetTaskByIdService } from '@/modules/task/services/get-task-by-id-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { projectIdSchema } from '@/shared/validators/project-validators';
import { taskIdSchema } from '@/shared/validators/task-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class GetTaskByIdController {
  constructor(
    private readonly getTaskByIdService: GetTaskByIdService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const projectId = projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const taskId = taskIdSchema.parse(req.params.taskId);

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { task } = await this.getTaskByIdService.execute({
      projectId,
      taskId,
      workspaceId,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Task fetched successfully',
      task,
    });
  });
}
