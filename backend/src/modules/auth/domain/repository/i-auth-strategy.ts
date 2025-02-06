import { IUserPresenter } from '@/modules/user/domain/models/i-user-presenter';

export interface IAuthStrategy {
  authenticate(req: Express.Request): Promise<{
    user?: IUserPresenter;
  }>;
}
