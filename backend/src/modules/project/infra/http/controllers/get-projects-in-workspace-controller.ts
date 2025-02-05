import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { GetProjectsInWorkspaceService } from '@/modules/project/services/get-projects-in-workspace-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { paginationValidator } from '@/shared/validators/pagination-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

const paginationSchema = paginationValidator();

export class GetProjectsInWorkspaceController {
  constructor(
    private readonly getProjectsInWorkspaceService: GetProjectsInWorkspaceService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?.id || '';

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { pageNumber, pageSize } = paginationSchema.parse(req.query);

    const { projects, metadata } =
      await this.getProjectsInWorkspaceService.execute({
        workspaceId,
        pageNumber,
        pageSize,
      });

    res.status(HTTP_STATUS.OK).json({
      message: 'Project fetched successfully',
      projects,
      pagination: {
        ...metadata,
        pageSize,
        pageNumber,
        limit: pageSize,
      },
    });
  });
}
