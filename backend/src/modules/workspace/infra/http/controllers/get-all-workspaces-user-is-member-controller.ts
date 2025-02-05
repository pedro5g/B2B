import { GetAllWorkspacesUserIsMemberService } from '@/modules/workspace/services/get-all-workspaces-user-is-member-service';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';

export class GetAllWorkspacesUserIsMemberController {
  constructor(
    private readonly getAllWorkspacesUserIsMemberService: GetAllWorkspacesUserIsMemberService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';

    const { workspaces } =
      await this.getAllWorkspacesUserIsMemberService.execute(userId);

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'User works fetched successfully', workspaces });
  });
}
