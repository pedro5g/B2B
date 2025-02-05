import { IAuthStrategy } from '@/modules/auth/domain/repository/i-auth-strategy';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';

export class LoginController {
  constructor(private authStrategy: IAuthStrategy) {}

  public handle = asyncHandler(async (req, res) => {
    const { user } = await this.authStrategy.authenticate(req);
    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'User logged successfully', user });
  });
}
