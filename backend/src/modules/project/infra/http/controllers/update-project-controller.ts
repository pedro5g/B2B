import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { UpdateProjectService } from '@/modules/project/services/update-project-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import {
  projectIdSchema,
  updateProjectSchema,
} from '@/shared/validators/project-validators';
import { workspaceIdSchema } from '@/shared/validators/workspace-validators';

export class UpdateProjectController {
  constructor(
    private readonly updateProjectService: UpdateProjectService,
    private readonly getMemberRoleInWorkspace: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const { name, description, emoji } = updateProjectSchema.parse(req.body);
    const projectId = projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?.id || '';

    const { role } = await this.getMemberRoleInWorkspace.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.EDIT_PROJECT]);

    const { project } = await this.updateProjectService.execute({
      projectId,
      workspaceId,
      name,
      description,
      emoji,
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Project updated successfully', project });
  });
}
