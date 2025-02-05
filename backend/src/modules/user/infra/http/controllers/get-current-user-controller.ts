import { GetCurrentUserService } from '@/modules/user/services/get-current-user-service';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';

export class GetCurrentUserController {
  constructor(private readonly getCurrentUserService: GetCurrentUserService) {}

  public handle = asyncHandler(async (req, res) => {
    const userId = req.user?.id || '';

    const { user } = await this.getCurrentUserService.execute({ userId });

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'user fetch successfully', user: user });
  });
}
