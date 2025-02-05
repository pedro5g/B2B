import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { CreateProjectService } from '@/modules/project/services/create-project-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import { createProjectSchema } from '@/shared/validators/project-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class CreateProjectController {
  constructor(
    private readonly createProjectService: CreateProjectService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const { name, description, emoji } = createProjectSchema.parse(req.body);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?.id || '';

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.CREATE_PROJECT]);

    const { project } = await this.createProjectService.execute({
      userId,
      workspaceId,
      name,
      description,
      emoji,
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Project created successfully', project });
  });
}
