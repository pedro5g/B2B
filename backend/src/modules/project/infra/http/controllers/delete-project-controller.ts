import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { DeleteProjectService } from '@/modules/project/services/delete-project-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { projectIdSchema } from '@/shared/validators/project-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class DeleteProjectController {
  constructor(
    private readonly deleteProjectService: DeleteProjectService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const projectId = projectIdSchema.parse(req.params.projectId);
    const userId = req.user?.id || '';

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.DELETE_PROJECT]);

    await this.deleteProjectService.execute({
      projectId,
      workspaceId,
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Project deleted successfully' });
  });
}
