import { IUserWithoutPassword } from '@/modules/user/domain/models/i-user';

declare global {
  namespace Express {
    interface User extends IUserWithoutPassword {}
  }
}
