import { IUserPresenter } from '@/modules/user/domain/models/i-user-presenter';
import { IUserWithWorkspace } from '@/modules/user/domain/models/i-user-with-workspace';

declare global {
  namespace Express {
    interface User extends IUserWithWorkspace {}
  }
}
