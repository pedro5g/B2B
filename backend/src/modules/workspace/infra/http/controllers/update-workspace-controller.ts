import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { UpdateWorkspaceService } from '@/modules/workspace/services/update-workspace-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import {
  updateWorkspaceSchema,
  workspaceIdSchema,
} from '@/shared/validators/workspace-validators';

export class UpdateWorkspaceController {
  constructor(
    private readonly updateWorkspaceService: UpdateWorkspaceService,
    private readonly getMemberRoleInWorkspaceService: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const { name, description } = updateWorkspaceSchema.parse(req.body);

    const { role } = await this.getMemberRoleInWorkspaceService.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.EDIT_WORKSPACE]);

    const { workspace } = await this.updateWorkspaceService.execute({
      workspaceId,
      name,
      description,
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Workspace updated successfully', workspace });
  });
}
