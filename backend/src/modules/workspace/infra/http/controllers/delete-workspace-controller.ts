import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { DeleteWorkspaceService } from '@/modules/workspace/services/delete-workspace-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class DeleteWorkspaceController {
  constructor(
    private readonly deleteWorkspaceService: DeleteWorkspaceService,
    private readonly getMemberRoleInWorkspaceService: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?.id || '';

    const { role } = await this.getMemberRoleInWorkspaceService.execute({
      workspaceId,
      userId,
    });
    roleGuard(role, [Permissions.DELETE_WORKSPACE]);

    await this.deleteWorkspaceService.execute({
      workspaceId,
      userId,
    });

    res
      .status(HTTP_STATUS.NO_CONTENT)
      .json({ message: 'Workspace deleted successfully' });
  });
}
