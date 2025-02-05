import { config } from '@/shared/config';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';

export class GoogleLoginCallbackController {
  public handle = asyncHandler(async (req, res) => {
    const currentWorkspace = req.user?.currentWorkspace;

    if (!currentWorkspace) {
      res
        .status(HTTP_STATUS.REDIRECT)
        .redirect(`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
    }

    res
      .status(HTTP_STATUS.REDIRECT)
      .redirect(`${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
  });
}
