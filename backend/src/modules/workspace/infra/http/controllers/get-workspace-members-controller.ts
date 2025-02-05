import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { GetWorkspaceMembersService } from '@/modules/workspace/services/get-workspace-members-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class GetWorkspaceMembersController {
  constructor(
    private readonly getWorkspaceMembersService: GetWorkspaceMembersService,
    private readonly getMemberRoleInWorkspaceService: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?.id || '';

    const { role } = await this.getMemberRoleInWorkspaceService.execute({
      userId,
      workspaceId,
    });

    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { members, roles } = await this.getWorkspaceMembersService.execute(
      workspaceId,
    );

    res.status(HTTP_STATUS.OK).json({
      message: 'Workspace members retrieved successfully',
      members,
      roles,
    });
  });
}
