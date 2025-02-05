import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { GetWorkspaceService } from '@/modules/workspace/services/get-workspace-service';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class GetWorkspaceByIdController {
  constructor(
    private readonly getWorkspaceByIdService: GetWorkspaceService,
    private readonly getMemberRoleInWorkspaceService: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?.id || '';

    // this line checks whether user is a member in this workspace
    await this.getMemberRoleInWorkspaceService.execute({ workspaceId, userId });

    const { workspace } = await this.getWorkspaceByIdService.execute(
      workspaceId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Workspace fetched successfully', workspace });
  });
}
