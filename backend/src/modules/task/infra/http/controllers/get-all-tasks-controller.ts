import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { GetAllTasksService } from '@/modules/task/services/get-all-tasks-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { paginationValidator } from '@/shared/validators/pagination-validators';
import { filterSchema } from '@/shared/validators/task-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

const paginationSchema = paginationValidator();

export class GetAllTasksController {
  constructor(
    private readonly getAllTasksService: GetAllTasksService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const filters = filterSchema.parse(req.query);
    const { pageNumber, pageSize } = paginationSchema.parse(req.query);

    const result = await this.getAllTasksService.execute({
      workspaceId,
      pageNumber,
      pageSize,
      ...filters,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'All tasks fetched successfully',
      ...result,
    });
  });
}
