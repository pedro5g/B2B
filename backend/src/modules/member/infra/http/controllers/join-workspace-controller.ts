import { JoinWorkspaceByInviteService } from '@/modules/member/services/join-workspace-by-invite-service';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { inviteCodeSchema } from '@/shared/validators/member-validators';

export class JoinWorkspaceController {
  constructor(
    private readonly joinWorkspaceByInviteService: JoinWorkspaceByInviteService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const inviteCode = inviteCodeSchema.parse(req.params.inviteCode);
    const userId = req.user?.id || '';

    const { workspaceId, role } =
      await this.joinWorkspaceByInviteService.execute({
        userId,
        inviteCode,
      });

    res.status(HTTP_STATUS.OK).json({
      message: 'Successfully joined the workspace',
      workspaceId,
      role,
    });
  });
}
