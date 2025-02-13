import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { GetWorkspaceAnalyticsService } from '@/modules/workspace/services/get-workspace-analytics-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class GetWorkspaceAnalyticsController {
  constructor(
    private readonly getWorkspaceAnalyticsService: GetWorkspaceAnalyticsService,
    private readonly getMemberRoleInWorkspaceService: GetMemberRoleInWorkspaceService,
  ) {}

  handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const workspaceId = workspaceIdSchema.parse(req.params.id);

    const { role } = await this.getMemberRoleInWorkspaceService.execute({
      userId,
      workspaceId,
    });

    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { analytics } = await this.getWorkspaceAnalyticsService.execute({
      workspaceId,
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Workspace analytics retrieved successfully',
      analytics,
    });
  });
}
