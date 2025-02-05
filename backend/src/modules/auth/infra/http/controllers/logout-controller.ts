import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';

export class LogoutController {
  public handle = asyncHandler(async (req, res) => {
    req.logout((error) => {
      if (error) {
        console.error('Logout error: ', error);
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to logout' });
      }
    });
    req.session = null;

    res.status(HTTP_STATUS.OK).json({ message: 'Logout successfully' });
  });
}
