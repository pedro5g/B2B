import { IUserWithoutPassword } from '@/modules/user/domain/models/i-user';

export interface IAuthStrategy {
  authenticate(req: Express.Request): Promise<{
    user?: IUserWithoutPassword;
  }>;
}
