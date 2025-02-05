import { GetMemberRoleInWorkspaceService } from '@/modules/member/services/get-member-role-in-workspace-service';
import { ChangeMemberRoleService } from '@/modules/workspace/services/change-member-role-service';
import { Permissions } from '@/shared/enums/roles';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { roleGuard } from '@/shared/utils/role-guard';
import {
  changeRoleSchema,
  workspaceIdSchema,
} from '@/shared/validators/workspace-validators';

export class ChangeWorkspaceMemberRoleController {
  constructor(
    private readonly changeMemberRoleService: ChangeMemberRoleService,
    private readonly getMemberRoleInWorkspaceService: GetMemberRoleInWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const { memberId, roleId } = changeRoleSchema.parse(req.body);

    const { role } = await this.getMemberRoleInWorkspaceService.execute({
      userId,
      workspaceId,
    });
    roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

    const { member } = await this.changeMemberRoleService.execute({
      workspaceId,
      memberId,
      roleId,
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Member Role changed successfully', member });
  });
}
