import { RegisterUserService } from '@/modules/auth/services/register-user-service';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { registerUserSchema } from '@/shared/validators/auth-validators';

export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  public handle = asyncHandler(async (req, res) => {
    const { name, email, password } = registerUserSchema.parse(req.body);
    await this.registerUserService.execute({ name, email, password });

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'User created successfully' });
  });
}
